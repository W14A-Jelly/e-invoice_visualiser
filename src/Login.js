import React, {useState} from 'react';
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


class Login extends React.Component {
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
              <div style={{fontSize: '25px', position:'relative', bottom:'10px'}}>Login</div>
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
                  label="Password"
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
  // const login = async () => {
  //   const res = await fetch('https://peaceful-headland-84816.herokuapp.com/user/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(task),
  //   })
    const [loggedin, setloggedin] = useState(false);
    const[email, setemail] = useState();
    const[password, setpassword] = useState();
    function handleLogin(event) {
      console.log('ABC')
      console.log(email)
      console.log(password)
      event.preventDefault();
      // get email and password

      //valid if empty
      //if (!email || !password) return;
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
            <div style={{fontSize: '25px', position:'relative', bottom:'10px'}}>Login</div>
              <p>
                <CusTextField
                required
                id="outlined-required"
                label="Email"
                onChange = {e=> setemail(e.target.value)}
                />
              </p>
              <p>
                <CusTextField
                required
                id="outlined-required"
                label="Password"
                onChange = {e=> setpassword(e.target.value)}
                />
              </p>
              <p>
                <CusButton type = "submit" variant="contained" onClick = {handleLogin}>Sign in</CusButton>
              </p>
              <p>
                <CusButton variant="contained">Register</CusButton>
              </p>
            </div>
          </Box>
        </div>
      </div>
    );

};
export default Login2;
