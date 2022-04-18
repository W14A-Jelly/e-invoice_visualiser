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
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
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
    width: '90px',
});

const CusButton3 = styled(Button)({
    width: '210px',
});
  
const CusTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '250px',
  top: '70px'
})

const Blacklist = () => {
    const [errormessage, setErrorMessage] = useState('');
    const [errorcount, setErrorCount] = useState(0);
    const [name, setName] = useState('');
    var name_unblock = '';
    const [list, setList] = useState([]);
    const [is_spam, setIs_spam] = useState(false);

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

    if (localStorage.token === '') {
        window.location.href = ('/')
    }

    function listblacklist() {
        const parameters = '?token='+localStorage.token;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/list'+parameters;
        console.log(url)
        axios({method: "get", url:url})
            .then((response) => {
                console.log(response.data.blacklist)
                setList(response.data.blacklist)
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    function block(event) {
        event.preventDefault();
        if (!name) return;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/block';
        console.log(url)
        const data = JSON.stringify({token:localStorage.token, email:name});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
            .then((response) => {
                console.log(response.data)
                listblacklist()
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    function unblock(event) {
        event.preventDefault();
        console.log(name_unblock)
        if (!name_unblock) return;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/unblock';
        console.log(url)
        const data = JSON.stringify({token:localStorage.token, email:name_unblock});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
            .then((response) => {
                console.log(response.data)
                listblacklist()
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    function spamfilter_on(event) {
        event.preventDefault();
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/spamfilter/on';
        console.log(url)
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    function spamfilter_off(event) {
        event.preventDefault();
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/spamfilter/off';
        console.log(url)
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }
    
    function spamfilter_state() {
        const parameters = '?token='+localStorage.token;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/spamfilter/status'+parameters;
        console.log(url)
        axios({method: "get", url:url})
            .then((response) => {
                console.log(response.data.status)
                setIs_spam(response.data.status)
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    useEffect (() =>{
        spamfilter_state()
        listblacklist()
	}, [])

    return (
        <div className='background' style={{backgroundColor: '#e0e0e0', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='top_panel' style={{position:"relative", zIndex:7, justifyContent:'center', alignItems:'center', overflowX:'hidden', overflowY:'hidden'}}>
                <Box sx={{width: '100vh'}}>
                <AppBar position="absolute" color="inherit" elevation={0} sx={{width: '190vh', height: '10vh', backgroundColor: 'white'}}>
                <div style={{position:'relative', top:'20px', right:'270px'}}>
                    <img src={logo} alt="logo"  width="150" height="100" pointerEvents='none' />
                </div>
                <div style={{fontSize: '25px', position:'relative', right:'-450px', top:'-50px', fontWeight:'bold', zIndex:4}}>Blacklist</div>
                <div className='logout' style={{position:'relative', right:'-1050px', top:'-90px', zIndex:9}}>
                        <CusButton variant="contained" color="error" onClick = {go_logout}><LogoutIcon />Log out</CusButton>
                    </div>
                </AppBar>
                </Box>
        </div>
        <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px', zIndex:10}}>
                <div style={{right:'200px'}}>
                <Error message={errormessage} count={errorcount}/>
                </div>
                <Box component="span" sx={{width: '50vh', height: '50vh', backgroundColor: 'white', zIndex:1, position:'absolute', top:'-420px'}}>
                <div className='Start retrieve' style={{position:'absolute', top:'-50px'}}>
                    {is_spam && <CusButton3 variant="contained" color="error" onClick={(e) => {setIs_spam(false); spamfilter_off(e);}}>Turn Spam filter off</CusButton3>}
                    {!is_spam && <CusButton3 variant="contained" color="success" onClick={(e) => {setIs_spam(true); spamfilter_on(e);}}>Turn Spam filter on</CusButton3>}
                </div>
                        <List dense sx={{ width: '100%', position:'relative', left:'150px', top:'50px', maxWidth: 350, bgcolor: 'white' }}>
                        {list.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                <IconButton onClick={(e) => {name_unblock = value; unblock(e);}}>
                                <CloseIcon />
                                </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemText id={labelId} primary={`${value}`} primaryTypographyProps={{ style: {fontSize:'20px'}}} />
                            </ListItem>
                            );
                        })}
                        </List>
                <div style={{position:'absolute', bottom:'150px', right:'170px'}}>
                <CusTextField
                id="outlined-helperText"
                label="Email"
                defaultValue=""
                onChange={e => setName(e.target.value)}
                />
                <CusButton2 variant="contained" sx={{bottom:'-80px', left:'20px'}} onClick={block}>Add</CusButton2>
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
                    <ListItem button onClick = {go_graph}>
                        <BarChartIcon/>
                        <ListItemText primary="Graph" sx={{position:'relative', right:'-20px'}} />
                    </ListItem>
                    <ListItem button onClick = {go_blacklist} sx={{backgroundColor: '#81d4fa'}}>
                        <BlockIcon/>
                        <ListItemText primary="Blacklist" sx={{position:'relative', right:'-20px'}}/>
                    </ListItem>
                    </List>
                </div>
            </Box>
        </div>
    </div>
    )
}

export default Blacklist