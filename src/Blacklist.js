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
    width: '90px',
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
    const [name_unblock, setUnblock] = useState('');
    const [list, setList] = useState([]);

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

    /*if (localStorage.token === '') {
        window.location.href = ('/')
    }*/

    function listblacklist() {
        const parameters = '?token='+localStorage.token;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/list'+parameters;
        axios.get({method: "get", url:url})
            .then((response) => {
                console.log(response.data)
                setList(response.data.blacklist)
            })
            .catch((err)=>{
                if (err.response) {
                    console.log(err.response)
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    function block(event) {
        event.preventDefault();
        if (!name) return;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/block';
        const data = JSON.stringify({token:localStorage.token, email:name});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
            .then((response) => {
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
        if (!unblock) return;
        const url = 'https://damp-sands-01446.herokuapp.com/blacklist/unblock';
        const data = JSON.stringify({token:localStorage.token, email:name_unblock});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
            .then((response) => {
            })
            .catch((err)=>{
                if (err.response) {
                    setErrorMessage(err.response.data["message"])
                    setErrorCount(errorcount + 1)
                }
            })
    }

    /*
    useEffect (() =>{
        listblacklist()
	}, [])*/

    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px'}}>
                <Box component="span" sx={{width: '50vh', height: '50vh', backgroundColor: 'white', zIndex:1}}>
                <Error message={errormessage} count={errorcount}/>
                <div style={{fontSize: '25px', position:'relative', top:'20px', zIndex:3}}>Blacklist</div>
                        <List dense sx={{ width: '100%', position:'relative', left:'150px', top:'50px', maxWidth: 350, bgcolor: 'white' }}>
                        {list.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                <IconButton onClick={(e) => {setUnblock(value); unblock(e);}}>
                                <CloseIcon />
                                </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemText id={labelId} primary={`${value}`} />
                            </ListItem>
                            );
                        })}
                        </List>
                <div style={{position:'absolute', bottom:'450px', right:'680px'}}>
                <CusTextField
                id="outlined-helperText"
                label="Email"
                defaultValue=""
                onChange={e => setName(e.target.value)}
                />
                <CusButton2 variant="contained" sx={{top:'80px', left:'30px'}} onClick={block}>Add</CusButton2>
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
                        <ListItem button onClick = {go_graph}>
                            <ListItemText primary="Graph" />
                        </ListItem>
                    <Divider />
                    <ListItem button onClick = {go_blacklist}>
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

    )
}

export default Blacklist