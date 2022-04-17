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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {Link} from 'react-router-dom';
import axios from 'axios';
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
})




const File = () => {
    
    const [btnState, setBtn] = useState(false)
    const [itemData,setitemData] = useState([])

    // Happens every 10 seconds. Get new list of invoices names
	useEffect (() =>{
		setInterval(() => {
            fetchfiles() 
            
        },5000)
	}, [])





    //Happens at page loading
    useEffect (() =>{
        fetchfiles()
        handleend()
        handlestart()
	}, [])


    function fetchfiles() {
        const url = 'https://damp-sands-01446.herokuapp.com/list/filenames?token='+localStorage.token;
        
        const options = {headers : {'Content-type': 'application/json'}}
        axios({method: "get", url:url})
        .then((response) => {
            console.log(response)
            const data = response.data.filenames;
            
            let New_invoices = []
            for (const x in data) {
                New_invoices = ([...New_invoices,{title:data[x]}])
            }
            setitemData(New_invoices)
            
            return data;
        })
        .catch((err)=>{ })
    }

	// const fetchfiles = async () => {
    //     //change url later
    //     const url = 'https://damp-sands-01446.herokuapp.com/list/filenames?token='+localStorage.token;
    //     //const url = 'http://192.168.1.184:8080/example'
	// 	const response = await fetch(url);
	// 	//const response = await fetch('http://192.168.1.184:8080/example?token='+localStorage.token)
	// 	const data = (await response.json()).filenames
    //     console.log(response)
	// 	return data
	// }
    function go_logout(event) {
        handleend()
        window.location.href = ('/')
        localStorage.token = ''
    }

    function go_filter(event) {
        window.location.href = ('/Filter')
    }

    function go_profile(event) {
        window.location.href = ('/profile')
    }

    function go_invoice(event) {
        window.location.href = ('/file')
        
    }


    function handlestart() {
        //valid if empty
        const url = 'https://damp-sands-01446.herokuapp.com/email/retrieve/start';
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
          .then((response) => {
            console.log(response);
            const data = response.data;
            setBtn(true);
          })
          .catch((err)=>{})
        
      }

      function handleend() {
        //valid if empty
        const url = 'https://damp-sands-01446.herokuapp.com/email/retrieve/end';
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
          .then((response) => {
            console.log(response);
            const data = response.data;
            setBtn(false);
          })
          .catch((err)=>{})
        
      }
      function end_retrieve(event){
        event.preventDefault()
        handleend()
      }
    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
            <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px'}}>
                <div className='filter' style={{position:'relative', bottom:'480px', left:'100px', zIndex:3}}>
                    <FormGroup>
                    <FormControlLabel control={<Switch color="warning" onClick={() => {go_filter()}} />} label="Filter" />
                    </FormGroup>
                </div>
                <Box component="span" sx={{width: '90vh', height: '70vh', backgroundColor: 'white', zIndex:1}}>
                <div style={{fontSize: '25px', position:'relative', right:'450px', top:'50px', zIndex:4}}>Invoices</div>
                <ImageList sx={{ width: '80vh', height: '60vh', position:'relative', left:'60px', top:'50px'}} cols={10}>
                    {itemData.map((item) => (
                        //repalce the href with https://peaceful-headland-84816.herokuapp.com/static/render+ {item.title}.jpg
                        <ImageListItem key={item.title}>
                        <a href = {"https://damp-sands-01446.herokuapp.com/static/renders/"+item.title+'.jpg'}><IconButton sx={{border: "1px solid grey", borderRadius: 1, height: '100px'}}>
                            <ArticleIcon fontSize="large" />
                        </IconButton></a>
                        <ImageListItemBar
                            title={item.title}
                            position="below"
                        />
                        </ImageListItem>
                    ))}
                    </ImageList>
                </Box>
            </div>
            <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute'}}>
                <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: 'white', margin:'0', padding:'0'}}>
                    <div style={{position:'aboslute', top:'20px'}}>
                    <img src={logo} alt="logo"  width="150" height="100" />
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
                            <ListItem button>
                                <ListItemText primary="Reports" />
                            </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Blacklist" />
                        </ListItem>
                        </List>
                    </div>
                    <div className='Start retrieve' style={{position:'relative', top:'100px'}}>
                        <CusButton variant="contained" color="success">refresh</CusButton>
                    </div>
                    <div className='End retrieve' style={{position:'relative', top:'130px'}}>
                        <CusButton variant="contained" color="error" onClick = {end_retrieve}>End retrieve</CusButton>
                    </div>
                    <div className='logout' style={{position:'relative', top:'700px'}}>
                        <CusButton variant="contained" onClick = {go_logout}>Log out</CusButton>
                    </div>
                </Box>
            </div>
        </div>
        );

}

export default File;

