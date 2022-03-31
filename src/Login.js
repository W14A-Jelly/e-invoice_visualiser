import React from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const BigButton = styled(Button)({
    width: '220px',
})

class Login extends React.Component {
    render() {
      return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} className='Login'>
          <div className='About'>
          </div>
          <div className='Input'>
            <p>
              <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Email"
              />
            </p>
            <p>
              <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Password"
              />
            </p>
            <p>
              <BigButton variant="contained">Login</BigButton>
            </p>
            <p>
              <BigButton variant="contained">Register</BigButton>
            </p>
          </div>
        </div>
      );
    }
  }


export default Login;