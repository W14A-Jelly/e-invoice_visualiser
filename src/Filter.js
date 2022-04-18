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
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Error from './error';
import AppBar from '@mui/material/AppBar';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BlockIcon from '@mui/icons-material/Block';
import LogoutIcon from '@mui/icons-material/Logout';


const style = {
    width: '100%',
    height: '100',
    maxWidth: 600,
    bgcolor: '#b3e5fc',
    position:'aboslute',
    top:'20px',
  };
  
const CusButton = styled(Button)({
      width: '130px',
  });
  
let itemData = []
  
const CusTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '100px',
  padding: '10px',
  color: 'black'
})

const SearchTextField = styled(TextField)({
    backgroundColor: 'white',
    width: '220px',
    padding: '10px',
  })

const Filter = () => {
    const [files, setfiles] = useState([])
    const [priceMax, setpriceMax] = useState("");
    const [priceMin, setpriceMin] = useState("");
    const [dateMin, setdateMin] = useState("");
    const [dateMax, setdateMax] = useState("");
    const [seller, setseller] = useState("");
    const [errormessage, setErrorMessage] = useState('');
    const [errorcount, setErrorCount] = useState(0);

    if (localStorage.token === '') {
        window.location.href = ('/')
    }

    function go_logout(event) {
        window.location.href = ('/');
        localStorage.token = '';
    }

    function go_profile(event) {
        window.location.href = ('/profile')
    }

    function go_invoice(event) {
        window.location.href = ('/file')
    }

    function fetchfiles() {
        const url = 'https://damp-sands-01446.herokuapp.com/list/filenames?token='+localStorage.token;
        
        const options = {headers : {'Content-type': 'application/json'}}
        axios({method: "get", url:url})
        .then((response) => {
            console.log(response)
            const data = response.data.filenames;
            setfiles(data)
        })
        .catch((err)=>{ })
    }

    function filterfiles(event) {
        event.preventDefault();
        var parameters = localStorage.token+'&sender='+seller+'&min_time='+dateMin+'&min_price='+priceMin;
        parameters += '&max_time='+dateMax+'&max_price='+priceMax;
        const url = 'https://damp-sands-01446.herokuapp.com/list/filenames/filtered?token='+parameters;
        console.log(url)
        const options = {headers : {'Content-type': 'application/json'}}
        axios({method: "get", url:url})
        .then((response) => {
            const data = response.data.filenames;
            console.log(data);
            setfiles(data)
            
            return data;
        })
        .catch((err)=>{
            if (err.response) {
                setErrorMessage(err.response.data["message"])
                setErrorCount(errorcount + 1)
            }
        })
    }

    useEffect (() =>{
        fetchfiles()
	}, [])

    function go_graph(event) {
        window.location.href = ('/graph')  
    }

    function go_blacklist(event) {
        window.location.href = ('/blacklist')
    }


    itemData = [];
    for (const x in files) {
        itemData = [...itemData,{title:files[x]}]
    }

    return (
        <div className='background' style={{backgroundColor: '#e0e0e0', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='top_panel' style={{position:"relative", zIndex:7, justifyContent:'center', alignItems:'center', overflowX:'hidden', overflowY:'hidden'}}>
                <Box sx={{width: '100vh'}}>
                <AppBar position="absolute" color="inherit" elevation={0} sx={{width: '190vh', height: '10vh', backgroundColor: 'white'}}>
                <div style={{position:'relative', top:'20px', right:'270px'}}>
                    <img src={logo} alt="logo"  width="150" height="100" pointerEvents='none' />
                </div>
                <div style={{fontSize: '25px', position:'relative', right:'-450px', top:'-50px', fontWeight:'bold', zIndex:4}}>Invoices</div>
                <div className='logout' style={{position:'relative', right:'-1050px', top:'-90px', zIndex:9}}>
                        <CusButton variant="contained" color="error" onClick = {go_logout}><LogoutIcon />Log out</CusButton>
                    </div>
                </AppBar>
                </Box>
            </div>
        <div className='middle_panel' style={{display: 'flex', position:'absolute', alignItems: 'center', justifyContent:'left', left:'403px', top:'218px', zIndex:10}}>
            <div className='filter' style={{position:'absolute', bottom:'460px', zIndex:3}}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked color="warning" onClick={() => {go_invoice()}} />} label="Filter" />
                </FormGroup>
            </div>
            <Box component="span" sx={{position:'relative', width: '35vh', height: '35vh', right:'45px', backgroundColor: 'white', zIndex:2}}>
            <p>
                <span style={{fontSize: '20px', top: '50px', left: '50px', position:'absolute', zIndex:4}}>Price</span>
                <CusTextField
                id="outlined-search"
                label="Min"
                type="number"
                onChange={e => setpriceMin(e.target.value)}
                />
                <CusTextField
                id="outlined-search"
                label="Max"
                type="number"
                onChange={e => setpriceMax(e.target.value)}
                />
            </p>
            <p>
                <span style={{fontSize: '20px', top: '140px', left: '50px', position:'absolute', zIndex:5}}>Date</span>
                <CusTextField
                id="outlined-search"
                label="Min"
                type="Search"
                onChange={e => setdateMin(e.target.value)}
                />
                <CusTextField
                id="outlined-search"
                label="Max"
                type="Search"
                onChange={e => setdateMax(e.target.value)}
                />
            </p>
            <p>
                <span style={{fontSize: '20px', top: '230px', left: '50px', position:'absolute', zIndex:5}}>Seller</span>
                <SearchTextField
                id="outlined-search"
                label="Name"
                type="Search"
                onChange={e => setseller(e.target.value)}
                />
            </p>
            <p>
                <CusButton variant="contained" onClick={filterfiles}>Enter</CusButton>
            </p>
            </Box>
        </div>
        <div className='right_panel' style={{display: 'flex', position:'absolute', alignItems: 'center', justifyContent:'right', right:'200px', top:'140px', zIndex:10}}>
            <Box component="span" sx={{width: '50vh', height: '70vh', backgroundColor: '#e0e0e0', zIndex:1, position:'relative', left:'60px', top:'48px'}}>
            <Error message={errormessage} count={errorcount}/>
            <ImageList sx={{ width: '40vh', height: '50vh', position:'relative', left:'20px', top:'50px'}} cols={5}>
                {itemData.map((item) => (
                    <ImageListItem key={item.title}>
                    <a href = {"https://damp-sands-01446.herokuapp.com/static/renders/"+item.title+'.jpg'}>
                    <IconButton sx={{border: "1px solid grey", borderRadius: 1, height: '100px', width: '75px', backgroundColor: 'white'}}>
                            <ArticleIcon fontSize="large" />
                    </IconButton></a>
                    <ImageListItemBar
                        title={item.title.slice(2, -4)}
                        position="below"
                    />
                    </ImageListItem>
                ))}
                </ImageList>
            </Box>
        </div>
        <div className='left_panel' style={{display: 'flex',  justifyContent:'left', alignItems:'center', position:'absolute'}}>
            <Box component="span" sx={{ width: 300, height: '100vh', backgroundColor: '#b3e5fc', margin:'0', padding:'0'}}>
                    <div className='list' style={{position:'relative', top:'150px', zIndex:7}}>
                        <List sx={style}>
                        <ListItem button onClick = {go_profile}>
                            <PersonIcon/>
                            <ListItemText  primary="Profile" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        <ListItem button onClick = {go_invoice} sx={{backgroundColor: '#81d4fa'}}>
                            <MonetizationOnIcon/>
                            <ListItemText primary="Invoices" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        <ListItem button onClick = {go_graph}>
                            <BarChartIcon/>
                            <ListItemText primary="Graph" sx={{position:'relative', right:'-20px'}} />
                        </ListItem>
                        <ListItem button onClick = {go_blacklist}>
                            <BlockIcon/>
                            <ListItemText primary="Blacklist" sx={{position:'relative', right:'-20px'}}/>
                        </ListItem>
                        </List>
                    </div>
                </Box>
            </div>
    </div>
    );
  };
  
  export default Filter;