import React from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import logo from './img/logo.png'

const CusButton = styled(Button)({
    width: '220px',
})

const CusTextField = styled(TextField)({
  backgroundColor: 'white'
})

class Register extends React.Component {
    render() {
      return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh'}}>
          <div style={{position:'relative', top:'80px'}}>
            <img src={logo} alt="logo"  width="200" height="150"/>
          </div>
          <div className='Login' style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
            <Box component="span" sx={{ p: 4, backgroundColor: 'white' }}>
              <div className='About'>
              </div>
              <div className='Input'>
                <div style={{fontSize: '25px', position:'relative', bottom:'10px'}}>Register</div>
                <p>
                  <CusTextField
                  required
                  id="outlined-required"
                  label="Email"
                  />
                </p>
                <p>
                  <CusTextField
                  required
                  id="outlined-required"
                  type="password"
                  label="Password"
                  />
                </p>
                <p>
                  <CusButton variant="contained">Register</CusButton>
                </p>
                <p>
                  <CusButton variant="contained">Back to Login</CusButton>
                </p>
              </div>
            </Box>
          </div>
        </div>
      );
    }
  }


export default Register;