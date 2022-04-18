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

const CusButton2 = styled(Button)({
    width: '120px',
});
  
const CusTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '250px',
  top: '70px'
})

  
const Profile = () => {
    //const [logged, setlogged] = useState(0)
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [gmailr, setgmailr] = useState();
    const [apppass, setapppass] = useState();
    const [errormessage, setErrorMessage] = useState('');
    const [errorcount, setErrorCount] = useState(0);
    
    if (localStorage.token === '') {
        window.location.href = ('/')
    }

    function updateemail(event) {
        event.preventDefault();
        //valid if empty
        if (!email) return;
        const url = 'https://damp-sands-01446.herokuapp.com/user/update/email';
        const data = JSON.stringify({email:email, token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.post(url, data, options)
          .then((response) => {
            console.log(response);
            const data = response.data;
            localStorage.token = ''
            window.location.href = ('/');
          })
          .catch((err)=>{
            if (err.response) {
                setErrorMessage(err.response.data["message"])
                setErrorCount(errorcount + 1)
        }})
        
    }

    function updatepass(event) {
    event.preventDefault();
    //valid if empty
    if (!password) return;
    const url = 'https://damp-sands-01446.herokuapp.com/user/update/password';
    const data = JSON.stringify({password:password, token:localStorage.token});
    const options = {headers : {'Content-type': 'application/json'}}
    axios.post(url, data, options)
        .then((response) => {
        console.log(response);
        const data = response.data;
        localStorage.token = ''
        window.location.href = ('/');
        })
        .catch((err)=>{
            if (err.response) {
                setErrorMessage(err.response.data["message"])
                setErrorCount(errorcount + 1)
            }
        })
    }

    function updategmailr(event) {
    event.preventDefault();
    //valid if empty
    if (!gmailr||!apppass) return;
    const url = 'https://damp-sands-01446.herokuapp.com/email/set';
    const data = JSON.stringify({email:gmailr, email_pass:apppass, token:localStorage.token});
    const options = {headers : {'Content-type': 'application/json'}}
    axios.post(url, data, options)
        .then((response) => {
        console.log(response);
        const data = response.data;
        window.location.href = ('/File');
        })
        .catch((err)=> {
            if (err.response) {
                setErrorMessage(err.response.data["message"])
                setErrorCount(errorcount + 1)
            }
        })
    }
    function go_logout(event) {
    window.location.href = ('/')
    localStorage.token = ''
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

    return (
        <div className='background' style={{backgroundColor: '#e0e0e0', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='top_panel' style={{position:"relative", zIndex:7, justifyContent:'center', alignItems:'center', overflowX:'hidden', overflowY:'hidden'}}>
                <Box sx={{width: '100vh'}}>
                <AppBar position="absolute" color="inherit" elevation={0} sx={{width: '190vh', height: '10vh', backgroundColor: 'white'}}>
                <div style={{position:'relative', top:'20px', right:'270px'}}>
                    <img src={logo} alt="logo"  width="150" height="100" pointerEvents='none' />
                </div>
                <div style={{fontSize: '25px', position:'relative', right:'-450px', top:'-50px', fontWeight:'bold', zIndex:4}}>Profile</div>
                <div className='logout' style={{position:'relative', right:'-1050px', top:'-90px', zIndex:9}}>
                        <CusButton variant="contained" color="error" onClick = {go_logout}><LogoutIcon />Log out</CusButton>
                    </div>
                </AppBar>
                </Box>
        </div>
        <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px', top:'-350px'}}>
                <Box component="span" sx={{width: '40vh', height: '45vh', backgroundColor: 'white', zIndex:10}}>
                <Error message={errormessage} count={errorcount}/>
                <div className='input' style={{display: 'grid', position:'relative', top:'20px'}}>
                <p style={{padding: 0, margin:5}}>
                    <CusTextField
                    id="outlined-helperText"
                    label="Email"
                    defaultValue=""
                    onChange={e => setemail(e.target.value)}
                    />
                </p>
                <p style={{padding: 0, margin:5}}>
                    <CusTextField
                    id="outlined-helperText"
                    label="Password"
                    type="password"
                    defaultValue=""
                    onChange={e => setpassword(e.target.value)}
                    />
                </p>
                <p style={{padding: 0, margin:5}}>
                    <CusTextField
                    id="outlined-helperText"
                    label="E-Invoice Gmail"
                    defaultValue=""
                    onChange={e => setgmailr(e.target.value)}
                    />
                </p>
                <p style={{padding: 0, margin:5}}>
                    <CusTextField
                    id="outlined-helperText"
                    label="App Password"
                    type="password"
                    defaultValue=""
                    onChange={e => setapppass(e.target.value)}
                    />
                </p>
                <div className='Update' style={{position:'relative', top:'100px', zIndex:4}}>
                    <CusButton2 variant="contained" onClick={(e) => {updateemail(e); updatepass(e);updategmailr(e);}}>Update</CusButton2>
                </div>
                </div>
                </Box>
                <Box component="span" sx={{width: '50vh', height: '45vh', backgroundColor: 'white', zIndex:10}}>
                <div style={{fontSize: '25px', position:'relative', top:'20px', fontWeight:'bold', zIndex:4}}>HOW TO START!</div>
                <div style={{fontSize: '20px', position:'relative', color:'grey', top:'20px', zIndex:4}}>HOW TO SETUP YOUR E-INVOICE EMAIL</div>
                    <Box bgcolor='#2196f3' sx={{position:'relative', width: '600px', height: '5vh', zIndex:10, left:'20px', top:'40px'}}>
                        <div style={{fontSize: '20px', position:'relative', color:'white', top:'20px', zIndex:4}}>1. Create a Google Account then create an App password</div>
                    </Box>
                    <Box bgcolor='#1e88e5' sx={{position:'relative', width: '600px', height: '5vh', zIndex:10, left:'20px', top:'40px'}}>
                        <div style={{fontSize: '20px', position:'relative', color:'white', top:'20px', zIndex:4}}>2. Set "App" as "Mail" & "Device" as "Windows computer"</div>
                    </Box>
                    <Box bgcolor='#1976d2' sx={{position:'relative', width: '600px', height: '5vh', zIndex:10, left:'20px', top:'40px'}}>
                        <div style={{fontSize: '20px', position:'relative', color:'white', top:'20px', zIndex:4}}>3. Generate App Password and copy it down with spaces</div>
                    </Box>
                    <Box bgcolor='#1565c0' sx={{position:'relative', width: '600px', height: '5vh', zIndex:10, left:'20px', top:'40px'}}>
                        <div style={{fontSize: '20px', position:'relative', color:'white', top:'20px', zIndex:4}}>4. Enable IMAP in Gmail settings and return to this page</div>
                    </Box>
                    <Box bgcolor='#0d47a1' sx={{position:'relative', width: '600px', height: '5vh', zIndex:10, left:'20px', top:'40px'}}>
                        <div style={{fontSize: '20px', position:'relative', color:'white', top:'20px', zIndex:4}}>5. Update "E-invoice Gmail" and "App Password" text fields</div>
                    </Box>
                </Box>
            </div>
        <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute'}}>
            <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: '#b3e5fc', margin:'0', padding:'0'}}>
                <div className='list' style={{position:'relative', top:'150px', zIndex:7}}>
                    <List sx={style}>
                    <ListItem button onClick = {go_profile} sx={{backgroundColor: '#81d4fa'}}>
                        <PersonIcon/>
                        <ListItemText  primary="Profile" sx={{position:'relative', right:'-20px'}}/>
                    </ListItem>
                    <ListItem button onClick = {go_invoice}>
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
            </Box>
        </div>
    </div>
    );
  };
  
  export default Profile;