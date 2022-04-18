import React, { useState } from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import logo from './img/logo.png';
import bg from './img/bg.png';
import axios from 'axios';
import Error from './error';

const CusButton = styled(Button)({
  width: '220px',
})

const CusTextField = styled(TextField)({
  backgroundColor: 'white'
})

const Login = () => {
  const [logged, setlogged] = useState(0)
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [errormessage, setErrorMessage] = useState('');
  const [errorcount, setErrorCount] = useState(0);

  function handleLogin(event) {
    event.preventDefault();
    //valid if empty
    if (!email || !password) return;
    const url = 'https://damp-sands-01446.herokuapp.com/user/login';
    const data = JSON.stringify({email:email, password:password});
    const options = {headers : {'Content-type': 'application/json'}}
    axios.post(url, data, options)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setlogged(true);
        localStorage.token = data.token;
        console.log('from login')
        console.log(localStorage.token)
        window.location.href = ('/file');
      })
      .catch((err)=>{
        if (err.response) {
          setErrorMessage(err.response.data["message"])
          setErrorCount(errorcount + 1)
        }
      })
    
  }

  function go_register(event) {
    window.location.href = ('/register')
    
  }
  return (
    <div className='background' style={{ backgroundColor: '#b3e5fc', height: '100vh' }}>
      
      <div className='Login' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Error message={errormessage} count={errorcount}/>
        <Box component="span" sx={{ width:'500px', height:'550px', backgroundColor: 'white', padding:'0', margin:'0'}}>
          <div style={{ position: 'relative', top: '20px' }}>
            <img src={logo} alt="logo" width="200" height="150" />
          </div>
          <div className='Input'>
            <div style={{ fontSize: '25px', position: 'relative', top: '10px' }}>Login</div>
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
              <CusButton type="submit" variant="contained" onClick={handleLogin}>Sign in</CusButton>
            </p>
            <p style={{position: 'relative', top: '30px' }}>
              <CusButton variant="contained" onClick = {go_register} >Register</CusButton>
            </p>
          </div>
        </Box>
        <Box component="span" sx={{p: 4, padding:'0', margin:'0' }}>
          <img src={bg} alt="bg" width="700" height="550" />
          <div style={{ fontSize: '25px', position: 'absolute', top: '370px', left:'500px',marginLeft:'300px', marginRight:'300px', color:'white'}}>Welcome to JellyFish Financials. Your one-stop shop to grow your small business. We specialise in e-invoicing solutions and provide the resources you need to easily manage your finances!
          </div>
        </Box>
      </div>
      
    </div>
  );

};
export default Login;
