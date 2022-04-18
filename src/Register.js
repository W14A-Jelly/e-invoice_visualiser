import React, {useState}from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import logo from './img/logo.png'
import axios from 'axios';
import Error from './error';
const CusButton = styled(Button)({
    width: '220px',
})

const CusTextField = styled(TextField)({
  backgroundColor: 'white'
})

const Register = () => {
  const [errormessage, setErrorMessage] = useState('');
  const [errorcount, setErrorCount] = useState(0);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  //change it later
  function back_to_login(event) {
    window.location.href = ('/')
  }
  function handlereg(event) {
    event.preventDefault();
    //valid if empty
    if (!email || !password) return;
    const url = 'https://damp-sands-01446.herokuapp.com/user/register';
    const data = JSON.stringify({email:email, password:password});
    const options = {headers : {'Content-type': 'application/json'}}
    axios.post(url, data, options)
      .then((response) => {
        console.log(response);
        const data = response.data;
        localStorage.token = data.token
        window.location.href = ('/file');
      })
      .catch((err)=>{
        if (err.response) {
          setErrorMessage(err.response.data["message"])
          setErrorCount(errorcount + 1)
        }
      })
  }
  return (
    <div className='background' style={{backgroundColor: '#b3e5fc', height: '100vh'}}>
      <div className='Login' style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
        <Error message={errormessage} count={errorcount}/>
        <Box component="span" sx={{ width:'500px', height:'550px', backgroundColor: 'white' }}>
          <div style={{ position: 'relative', top: '20px' }}>
            <img src={logo} alt="logo" width="200" height="150" />
          </div>
          <div className='Input'>
            <div style={{ fontSize: '25px', position: 'relative', top: '10px' }}>Register</div>
            <p style={{position: 'relative', top: '30px' }}>
            <CusTextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              onChange={e => setemail(e.target.value)}
              />
            </p>
            <p style={{position: 'relative', top: '30px' }}>
            <CusTextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              defaultValue=""
              onChange={e => setpassword(e.target.value)}
              />
            </p>
            <p style={{position: 'relative', top: '30px' }}>
            <CusButton variant="contained" onClick = {handlereg}>Register</CusButton>
            </p>
            <p style={{position: 'relative', top: '30px' }}>
            <CusButton variant="contained" onClick = {back_to_login}>Back to Login</CusButton>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Register;