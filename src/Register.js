import React, {useState}from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import logo from './img/logo.png'
import axios from 'axios';
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

const Register2 = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  //change it later
  const[token, settoken] = useState();
  function back_to_login(event) {
    window.location.href = ('/')
  }
  function handlereg(event) {
    event.preventDefault();
    //valid if empty
    if (!email || !password) return;
    const url = 'https://peaceful-headland-84816.herokuapp.com/user/register';
    const data = JSON.stringify({email:email, password:password});
    const options = {headers : {'Content-type': 'application/json'}}
    axios.post(url, data, options)
      .then((response) => {
        console.log(response);
        const data = response.data;
        settoken(data.token);
        window.location.href = ('/file');
      })
      .catch((err)=>{ })
  }
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
              onChange={e => setemail(e.target.value)}
              />
            </p>
            <p>
              <CusTextField
              required
              id="outlined-required"
              label="Password"
              onChange={e => setpassword(e.target.value)}
              />
            </p>
            <p>
              <CusButton variant="contained" onClick = {handlereg}>Register</CusButton>
            </p>
            <p>
              <CusButton variant="contained" onClick = {back_to_login}>Back to Login</CusButton>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Register2;