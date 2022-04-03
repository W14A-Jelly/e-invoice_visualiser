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
  });
  
let itemData = []
  
const CusTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '100px',
  padding: '10px',
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

    // useEffect (() =>{
	// 	const get_files = async () =>{
	// 		const filesfromserver = await filterfiles()
	// 		setfiles(filesfromserver)
	// 	}
	// get_files()

	// }, [])

    function go_logout(event) {
        window.location.href = ('/');
        localStorage.token = '';
    }
    function go_main(event) {
        window.location.href = ('/file');
    }

    function filterfiles(event) {
        event.preventDefault();
        const parameters = localStorage.token+'&sender='+seller+'&time='+dateMin+'&price='+priceMin;
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
        .catch((err)=>{ })
    }

    itemData = []
    for (const x in files) {
        itemData = [...itemData,{title:files[x]}]
    }

    function handlestart(event) {
        event.preventDefault();
        //valid if empty
        const url = 'https://damp-sands-01446.herokuapp.com/email/retrieve/start';
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
          .then((response) => {
            console.log(response);
            const data = response.data;
          })
          .catch((err)=>{ })
        
      }

      function handleend(event) {
        event.preventDefault();
        //valid if empty
        const url = 'https://damp-sands-01446.herokuapp.com/email/retrieve/end';
        const data = JSON.stringify({token:localStorage.token});
        const options = {headers : {'Content-type': 'application/json'}}
        axios.put(url, data, options)
          .then((response) => {
            console.log(response);
            const data = response.data;
          })
          .catch((err)=>{ })
        
      }

    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
        <div className='middle_panel' style={{display: 'flex', position:'absolute', alignItems: 'center', justifyContent:'left', left:'420px', top:'190px', zIndex:2}}>
            <div className='filter' style={{position:'absolute', bottom:'460px', zIndex:3}}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked color="warning" onClick={() => {go_main()}} />} label="Filter" />
                </FormGroup>
            </div>
            <Box component="span" sx={{width: '35vh', height: '35vh', backgroundColor: 'white', zIndex:2}}>
            <p>
                <span style={{fontSize: '20px', top: '50px', left: '50px', position:'absolute', zIndex:4}}>Price</span>
                <CusTextField
                id="filled-search"
                label="Min"
                type="number"
                variant="filled"
                onChange={e => setpriceMin(e.target.value)}
                />
                <CusTextField
                disabled
                id="filled-disabled"
                label="Max"
                type="number"
                variant="filled"
                onChange={e => setpriceMax(e.target.value)}
                />
            </p>
            <p>
                <span style={{fontSize: '20px', top: '140px', left: '50px', position:'absolute', zIndex:5}}>Date</span>
                <CusTextField
                id="filled-search"
                label="Min"
                type="Search"
                variant="filled"
                onChange={e => setdateMin(e.target.value)}
                />
                <CusTextField
                disabled
                id="filled-disabled"
                label="Max"
                type="Search"
                variant="filled"
                onChange={e => setdateMax(e.target.value)}
                />
            </p>
            <p>
                <span style={{fontSize: '20px', top: '230px', left: '50px', position:'absolute', zIndex:5}}>Seller</span>
                <SearchTextField
                id="filled-search"
                label="Text"
                type="Search"
                variant="filled"
                onChange={e => setseller(e.target.value)}
                />
            </p>
            <p>
                <CusButton variant="contained" onClick={filterfiles}>Enter</CusButton>
            </p>
            
            </Box>
        </div>
        <div className='right_panel' style={{display: 'flex', position:'absolute', alignItems: 'center', justifyContent:'right', right:'100px', top:'190px', zIndex:1}}>
            <div style={{fontSize: '25px', position:'relative', bottom:'420px', left:'150px', zIndex:3}}>Invoices</div>
            <Box component="span" sx={{width: '50vh', height: '70vh', backgroundColor: 'white', zIndex:1}}>
            <ImageList sx={{ width: '40vh', height: '50vh', position:'relative', left:'60px', top:'50px'}} cols={5}>
                {itemData.map((item) => (
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
                    <Link to = "/Profile">
                            <ListItem>
                                <ListItemText  primary="Profile" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to = "/File">
                            <ListItem button divider>
                                <ListItemText primary="Invoices" />
                            </ListItem>
                        </Link>
                        
                        <Link to = "/Reports">
                            <ListItem button>
                                <ListItemText primary="Reports" />
                            </ListItem>
                        </Link>
                        <Divider  light />
                        <Link to = "/Blacklist">
                            <ListItem button>
                                <ListItemText primary="Blacklist" />
                            </ListItem>
                        </Link>
                        </List>
                </div>
                <div className='logout' style={{position:'relative', top:'100px'}}>
                    <CusButton variant="contained" color="error" onClick = {go_logout}>Log out</CusButton>
                </div>
                <div className='Start retrieve' style={{position:'relative', top:'110px'}}>
                    <CusButton variant="contained" color="error" onClick = {handlestart}>Start retrieve</CusButton>
                </div>
                <div className='End retrieve' style={{position:'relative', top:'120px'}}>
                    <CusButton variant="contained" color="error" onClick = {handleend}>End retrieve</CusButton>
                </div>
            </Box>
        </div>
    </div>
    );
  };
  
  export default Filter;