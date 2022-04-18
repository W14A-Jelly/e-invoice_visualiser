import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import logo from './img/logo.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import CanvasJSReact from './canvasjs.react';
import axios from 'axios';
import Error from './error'

const style = {
    width: '100%',
    height: '100',
    maxWidth: 600,
    bgcolor: 'white',
    position:'aboslute',
    top:'20px',
  };
  
const CusButton = styled(Button)({
      width: '110px',
  });
  
let itemData = []
  
const CusTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '100px',
  padding: '10px',
})

const SearchTextField = styled(TextField)({
    backgroundColor: 'white',
    width: '220px',
    padding: '10px',
  })
  
const Graph = () => {
    const [year, setYear] = useState(2022);
    const [errormessage, setErrorMessage] = useState('');
    const [errorcount, setErrorCount] = useState(0);

    if (localStorage.token === '') {
        window.location.href = ('/')
    }

    function go_logout(event) {
        window.location.href = ('/');
        localStorage.token = '';
    }

    function go_profile(event) {
        window.location.href = ('/profile')
    }

    function go_invoice(event) {
        window.location.href = ('/file')
    }

    function go_graph(event) {
        window.location.href = ('/graph')
    }

    function go_blacklist(event) {
        window.location.href = ('/blacklist')
    }

    function getstats() {
        const parameters = localStorage.token+'&year='+year;
        const url = 'https://damp-sands-01446.herokuapp.com/get/stats?token='+parameters;
        console.log(url)
        const options = {headers : {'Content-type': 'application/json'}}
        axios({method: "get", url:url})
        .then((response) => {
            return setdatapoints(response.data.price);
        })
        .catch((err)=>{
            if (err.response) {
                setErrorMessage(err.response.data["message"])
                setErrorCount(errorcount + 1)
            }
        })
    }
    
    function setdatapoints(data) {
        const datapoints = []
        for (var i = 0; i < data.length; i++) {
            const date = new Date(2022, i, 1);
            datapoints.push({x: date, y:data[i]})
        }

        return datapoints
    }

    /* setdatapoints([0,0,0,0,0,0,0,0,0,0,0,0]) */
    //const stats = [{x:new Date(2022, 1, 1), y:200}, {x:new Date(2022, 2, 1), y:500}]
    const stats = getstats()
    var Component = React.Component;
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    class Canvas extends Component {
        render() {	
            const options = {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Total invoice spending for each month"
                },
                axisY: {
                    title: "Price (AUD)",
                    prefix: "$"
                },
                axisX: {
                    title: "Months",
                    valueFormatString: "MMM",
                    interval: 1,
                    intervalType: "month"
                },
                data: [{
                    type: "line",
                    dataPoints: stats
                }]
            }
            return (
            <div>
                <CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
            );
        }
    }

    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='right_panel' style={{display: 'flex', position:'absolute', alignItems: 'center', justifyContent:'right', right:'100px', top:'190px', zIndex:1}}>
            <Box component="span" sx={{width: '90vh', height: '35vh', backgroundColor: 'white', position:'relative', justifyContent: 'center', zIndex:1}}>
                <Error message={errormessage} count={errorcount}/>
                <Canvas sx={{zIndex:5}}/>
            </Box>
        </div>
        <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute'}}>
            <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: 'white', margin:'0', padding:'0'}}>
                <div style={{position:'aboslute', top:'20px'}}>
                <img src={logo} alt="logo"  width="150" height="100" />
                </div>
                <div className='list'>
                    <List sx={style} component="nav" aria-label="mailbox folders">
                    <ListItem button onClick = {go_profile}>
                        <ListItemText  primary="Profile" />
                    </ListItem>
                    <Divider />
                        <ListItem button onClick = {go_invoice}>
                            <ListItemText primary="Invoices" />
                        </ListItem>
                    <Divider />
                        <ListItem button>
                            <ListItemText primary="Graph" onClick = {go_graph}/>
                        </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Blacklist" onClick = {go_blacklist}/>
                    </ListItem>
                    </List>
                </div>
                <div className='logout' style={{position:'relative', top:'700px'}}>
                    <CusButton variant="contained" onClick = {go_logout}>Log out</CusButton>
                </div>
            </Box>
        </div>
    </div>
    );
  };


  
  export default Graph;