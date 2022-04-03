import React, { useState } from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import logo from './img/logo.png';
import axios from 'axios';
const CusButton = styled(Button)({
  width: '220px',
})

const CusTextField = styled(TextField)({
  backgroundColor: 'white'
})


class Login extends React.Component {
  render() {
    return (
      <div className='background' style={{ backgroundColor: '#90caf9', height: '100vh' }}>
        <div style={{ position: 'relative', top: '80px' }}>
          <img src={logo} alt="logo" width="200" height="150" />
        </div>
        <div className='Login' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Box component="span" sx={{ p: 4, backgroundColor: 'white' }}>
            <div className='About'>
            </div>
            <div className='Input'>
              <div style={{ fontSize: '25px', position: 'relative', bottom: '10px' }}>Login</div>
              <p>
                <CusTextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue=""
                />
              </p>
              <p>
                <CusTextField
                  required
                  id="outlined-required"
                  type="password"
                  label="Password"
                  defaultValue=""
                />
              </p>
              <p>
                <CusButton variant="contained">Sign in</CusButton>
              </p>
              <p>
                <CusButton variant="contained">Register</CusButton>
              </p>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}


const Login2 = () => {
  const [logged, setlogged] = useState(0)
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  //change it later
  // async function login() {
  //   const res = await fetch('https://peaceful-headland-84816.herokuapp.com/user/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify({email:email, password:password}),
  //   })
  //   console.log(res)
  //   if (res.status == 200){
  //     console.log(logged)
  //     await setlogged(1)
  //     const data = await res.json()
  //     await console.log(logged)
  //     return data;
  //   }else{
  //     console.log('run')
  //     setlogged(0);
  //     return;
  //   }
  // }

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
      .catch((err)=>{ })
    
  }

  function go_register(event) {
    window.location.href = ('/register')
    
  }
  return (
    <div className='background' style={{ backgroundColor: '#90caf9', height: '100vh' }}>
      <div style={{ position: 'relative', top: '80px' }}>
        <img src={logo} alt="logo" width="200" height="150" />
      </div>
      <div className='Login' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Box component="span" sx={{ p: 4, backgroundColor: 'white' }}>
          <div className='About'>
          </div>
          <div className='Input'>
            <div style={{ fontSize: '25px', position: 'relative', bottom: '10px' }}>Login</div>
            <p>
              <CusTextField
                required
                id="outlined-required"
                label="Email"
                defaultValue=""
                onChange={e => setemail(e.target.value)}
              />
            </p>
            <p>
              <CusTextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                defaultValue=""
                onChange={e => setpassword(e.target.value)}
              />
            </p>
            <p>
              <CusButton type="submit" variant="contained" onClick={handleLogin}>Sign in</CusButton>
            </p>
            <p>
              <CusButton variant="contained" onClick = {go_register} >Register</CusButton>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );

};
export default Login2;
