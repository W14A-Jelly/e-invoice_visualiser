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
import {Link} from 'react-router-dom';
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

const CusButton2 = styled(Button)({
    width: '200px',
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

    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        
        <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px'}}>
                <Box component="span" sx={{width: '50vh', height: '50vh', backgroundColor: 'white', zIndex:1}}>
                <Error message={errormessage} count={errorcount}/>
                <div style={{fontSize: '25px', position:'relative', top:'20px', zIndex:3}}>Profile</div>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Email"
                    defaultValue=""
                    onChange={e => setemail(e.target.value)}
                    />
                </p>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Password"
                    type="password"
                    defaultValue=""
                    onChange={e => setpassword(e.target.value)}
                    />
                </p>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Gmail Receive"
                    defaultValue=""
                    onChange={e => setgmailr(e.target.value)}
                    />
                </p>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Gmail Password"
                    type="password"
                    defaultValue=""
                    onChange={e => setapppass(e.target.value)}
                    />
                </p>
                
                <div className='Update' style={{position:'relative', top:'100px', zIndex:4}}>
                    <CusButton2 variant="contained" onClick={updateemail}>Update email</CusButton2>
                </div>
                <div className='Update' style={{position:'relative', top:'110px', zIndex:4}}>
                    <CusButton2 variant="contained" onClick={updatepass}>Update password</CusButton2>
                </div>
                <div className='Update' style={{position:'relative', top:'120px', zIndex:4}}>
                    <CusButton2 variant="contained" onClick={updategmailr}>Update gmail & pass</CusButton2>
                </div>
                </Box>
            </div>
        <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute'}}>
            <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: 'white', margin:'0', padding:'0'}}>
                <div style={{position:'aboslute', top:'20px'}}>
                <img src={logo} alt="logo" width="150" height="100" />
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
                            <ListItemText primary="Reports" />
                        </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Blacklist" />
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
  
  export default Profile;