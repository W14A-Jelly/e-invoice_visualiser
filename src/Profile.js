import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import logo from './img/logo.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

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
    width: '170px',
});
  
const CusTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '250px',
  top: '70px'
})

  
const Profile = () => {
    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px'}}>
                <Box component="span" sx={{width: '50vh', height: '50vh', backgroundColor: 'white', zIndex:1}}>
                <div style={{fontSize: '25px', position:'relative', top:'20px', zIndex:3}}>Profile</div>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Email"
                    defaultValue=""
                    />
                </p>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Password"
                    type="password"
                    defaultValue=""
                    />
                </p>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Gmail Receive"
                    defaultValue=""
                    />
                </p>
                <p>
                    <CusTextField
                    id="outlined-helperText"
                    label="Gmail Password"
                    type="password"
                    defaultValue=""
                    />
                </p>
                
                <div className='Update' style={{position:'relative', top:'150px', zIndex:4}}>
                    <CusButton2 variant="contained">Update</CusButton2>
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
                    <ListItem button>
                        <ListItemText  primary="Profile" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                        <ListItemText primary="Invoices" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <Divider  light />
                    <ListItem button>
                        <ListItemText primary="Blacklist" />
                    </ListItem>
                    </List>
                </div>
                <div className='logout' style={{position:'relative', top:'100px'}}>
                    <CusButton variant="contained" color="error">Log out</CusButton>
                </div>
            </Box>
        </div>
    </div>
    );
  };
  
  export default Profile;