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
import AppBar from '@mui/material/AppBar';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BlockIcon from '@mui/icons-material/Block';
import LogoutIcon from '@mui/icons-material/Logout';

const style = {
    width: '100%',
    height: '100',
    maxWidth: 600,
    bgcolor: '#b3e5fc',
    position:'aboslute',
    top:'20px',
  };
  
const CusButton = styled(Button)({
      width: '130px',
});

const CusTextField = styled(TextField)({
backgroundColor: 'white',
width: '100px',
padding: '10px',
})
  
let itemData = []
  
const Graph = () => {
    var year = 2022;
    const [errormessage, setErrorMessage] = useState('');
    const [errorcount, setErrorCount] = useState(0);
    const [stats, setStats] = useState([]);

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
            console.log(response.data.price)
            setdatapoints(response.data.price);
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
            const date = new Date(year, i, 1);
            datapoints.push({x: date, y:data[i]})
        }

        setStats(datapoints)
    }

    useEffect (() =>{
        getstats()
        console.log(stats)
	}, [])
    
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
                    xValueFormatString: "MMM",
                    yValueFormatString: "$#,##0.##",
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
        <div className='background' style={{backgroundColor: '#e0e0e0', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='top_panel' style={{position:"relative", zIndex:7, justifyContent:'center', alignItems:'center', overflowX:'hidden', overflowY:'hidden'}}>
                <Box sx={{width: '100vh'}}>
                <AppBar position="absolute" color="inherit" elevation={0} sx={{width: '190vh', height: '10vh', backgroundColor: 'white'}}>
                <div style={{position:'relative', top:'20px', right:'270px'}}>
                    <img src={logo} alt="logo"  width="150" height="100" pointerEvents='none' />
                </div>
                <div style={{fontSize: '25px', position:'relative', right:'-450px', top:'-50px', fontWeight:'bold', zIndex:4}}>Graph</div>
                <div className='logout' style={{position:'relative', right:'-1050px', top:'-90px', zIndex:9}}>
                        <CusButton variant="contained" color="error" onClick = {go_logout}><LogoutIcon />Log out</CusButton>
                    </div>
                </AppBar>
                </Box>
        </div>
        <div className='right_panel' style={{display: 'flex', position:'absolute', alignItems: 'center', justifyContent:'right', right:'80px', top:'180px', zIndex:10}}>
            <Box sx={{ minWidth: 120, position:'relative', bottom:'170px', left:'140px', zIndex:7}}>
                <CusTextField
                    id="outlined-helperText"
                    label="Year"
                    defaultValue="2022"
                    onChange={e => {year = e.target.value; getstats();}}
                    />
            </Box>
            <Box component="span" sx={{width: '90vh', height: '35vh', backgroundColor: 'white', position:'relative', justifyContent: 'center', zIndex:1}}>
                <Error message={errormessage} count={errorcount}/>
                <div className='graph' style={{zIndex:5, position:'relative', top:'70px'}}>
                <Box sx={{width: '80px', height: '50px',bottom: '0px', backgroundColor: 'white', position:'absolute', zIndex:11}}></Box>
                <Canvas />
                <Box sx={{width: '80px', height: '20px',bottom: '0px', right:'0px', backgroundColor: 'white', position:'absolute', zIndex:11}}></Box>
                </div>
            </Box>
        </div>
        <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute'}}>
                <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: '#b3e5fc', margin:'0', padding:'0'}}>
                    <div className='list' style={{position:'relative', top:'150px', zIndex:7}}>
                        <List sx={style}>
                        <ListItem button onClick = {go_profile}>
                            <PersonIcon/>
                            <ListItemText  primary="Profile" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        <ListItem button onClick = {go_invoice}>
                            <MonetizationOnIcon/>
                            <ListItemText primary="Invoices" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        <ListItem button onClick = {go_graph}  sx={{backgroundColor: '#81d4fa'}}>
                            <BarChartIcon/>
                            <ListItemText primary="Graph" sx={{position:'relative', right:'-20px'}} />
                        </ListItem>
                        <ListItem button onClick = {go_blacklist}>
                            <BlockIcon/>
                            <ListItemText primary="Blacklist" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        </List>
                    </div>
                </Box>
            </div>
    </div>
    );
  };

  export default Graph;