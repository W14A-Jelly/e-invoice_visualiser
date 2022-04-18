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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Error from './errorpersistant';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
})

const File = () => {
    
    const [btnState, setBtn] = useState(false)
    const [itemData,setitemData] = useState([])
    const [errormessage, setErrorMessage] = useState('');
    const [errorcount, setErrorCount] = useState(0);

    if (localStorage.token === '') {
        window.location.href = ('/')
    }

    // Happens every 10 seconds. Get new list of invoices names
	useEffect (() =>{
		setInterval(() => {
            fetchfiles() 
            
        },5000)
	}, [])

    //Happens at page loading
    useEffect (() =>{
        fetchfiles()
        handleend()
        handlestart()
	}, [])

    function fetchfiles() {
        const url = 'https://damp-sands-01446.herokuapp.com/list/filenames?token='+localStorage.token;
        
        const options = {headers : {'Content-type': 'application/json'}}
        axios({method: "get", url:url})
        .then((response) => {
            console.log(response)
            const data = response.data;
            const filename = data.filenames;
            const is_new = data.new;
            const paid = data.paid;
            
            
            let New_invoices = []
            for (const x in filename) {
                console.log(is_new[x])
                New_invoices = ([...New_invoices,{title:filename[x], new:is_new[x], paid:paid[x]}])
            }
            setitemData(New_invoices)
            
            return data;
        })
        .catch((err)=>{ })
    }

    function go_logout(event) {
        handleend()
        window.location.href = ('/')
        localStorage.token = ''
    }

    function go_filter(event) {
        window.location.href = ('/filter')
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


    function handlestart() {
        //valid if empty
        const url = 'https://damp-sands-01446.herokuapp.com/email/retrieve/start';
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
          .then((response) => {
            const data = response.data;
            setBtn(true);
          })
          .catch((err)=>{
            if (err.response) {
                console.log()
                setErrorMessage('You have not setup your invoice gmail. Make sure to go to "Profile" tab first to start recieving invocies!')
                setErrorCount(errorcount + 1)
            }
          })
        
      }

      function handleend() {
        //valid if empty
        const url = 'https://damp-sands-01446.herokuapp.com/email/retrieve/end';
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
          .then((response) => {
            console.log(response);
            const data = response.data;
            setBtn(false);
          })
          .catch((err)=>{
          })
        
      }
      function end_retrieve(event){
        event.preventDefault()
        handleend()
      }
    return (
        <div className='background' style={{backgroundColor: '#e0e0e0', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
            <div className='top_panel' style={{position:"relative", zIndex:7, justifyContent:'center', alignItems:'center', overflowX:'hidden', overflowY:'hidden'}}>
                <Box sx={{width: '100vh'}}>
                <AppBar position="absolute" color="inherit" elevation={0} sx={{width: '190vh', height: '10vh', backgroundColor: 'white'}}>
                <div style={{position:'relative', top:'20px', right:'270px'}}>
                    <img src={logo} alt="logo"  width="150" height="100" pointerEvents='none' />
                </div>
                <div style={{fontSize: '25px', position:'relative', right:'-450px', top:'-50px', fontWeight:'bold', zIndex:4}}>Invoices</div>
                <div className='logout' style={{position:'relative', right:'-1050px', top:'-90px', zIndex:9}}>
                        <CusButton variant="contained" color="error" onClick = {go_logout}><LogoutIcon />Log out</CusButton>
                    </div>
                </AppBar>
                </Box>
            </div>
            <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'70px'}}>
                <div className='filter' style={{position:'relative', bottom:'550px', left:'175px', zIndex:10}}>
                    <FormGroup>
                    <FormControlLabel control={<Switch color="warning" onClick={go_filter} />} label="Filter" />
                    </FormGroup>
                </div>
                <Box component="span" sx={{width: '95vh', height: '70vh', backgroundColor: '#e0e0e0', zIndex:1, bottom:'100px', position:'relative'}}>
                <div style={{position:'relative', left:'300px', top:'10px', zIndex:5}}>
                <Error message={errormessage} count={errorcount}/>
                </div>
                <ImageList sx={{ width: '80vh', height: '60vh', position:'relative', left:'60px', top:'50px'}} cols={10}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.title}>
                        {false && <NewReleasesIcon sx={{position:'absolute', zIndex:5, left:'5px'}}/>}
                        {false && <CheckCircleIcon sx={{position:'absolute', zIndex:5, left:'60px'}}/>}
                        <a href = {"https://damp-sands-01446.herokuapp.com/static/renders/"+item.title+'.jpg'}>
                        <IconButton sx={{border: "1px solid grey", borderRadius: 1, height: '100px', width: '75px',backgroundColor: 'white'}}>
                            <ArticleIcon fontSize="large"  />
                        </IconButton>
                        </a>
                        <ImageListItemBar
                            title={item.title.slice(2, -4)}
                            position="below"
                        />
                        </ImageListItem>
                    ))}
                    </ImageList>
                </Box>
            </div>
            <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute', zIndex:6}}>
                <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: '#b3e5fc', margin:'0', padding:'0'}}>
                    <div className='list' style={{position:'relative', top:'150px'}}>
                        <List sx={style}>
                        <ListItem button onClick = {go_profile}>
                            <PersonIcon/>
                            <ListItemText  primary="Profile" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        <ListItem button onClick = {go_invoice} sx={{backgroundColor: '#81d4fa'}}>
                            <MonetizationOnIcon/>
                            <ListItemText primary="Invoices" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        <ListItem button onClick = {go_graph}>
                            <BarChartIcon/>
                            <ListItemText primary="Graph" sx={{position:'relative', right:'-20px'}} />
                        </ListItem>
                        <ListItem button onClick = {go_blacklist}>
                            <BlockIcon/>
                            <ListItemText primary="Blacklist" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        </List>
                    </div>
                    {false && <div className='Start retrieve' style={{position:'relative', top:'100px'}}>
                        <CusButton variant="contained" color="success">refresh</CusButton>
                    </div>}
                    {false && <div className='End retrieve' style={{position:'relative', top:'130px'}}>
                        <CusButton variant="contained" color="error" onClick = {end_retrieve}>End retrieve</CusButton>
                    </div>}
                </Box>
            </div>

        </div>
        );

}

export default File;

