import * as React from 'react';
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

const itemData = [
    {title: 'filename1'}, {title: 'filename2'}, {title: 'filename3'}]


class Main extends React.Component {
    render() {
    return (
        <div className='background' style={{backgroundColor: '#90caf9', height: '100vh', display: 'grid', width: '100%', overflowX:'hidden', overflowY:'hidden', zIndex:0}}>
            <div className='right_panel' style={{display: 'flex', position:'relative', alignItems: 'center', justifyContent:'center', left:'150px'}}>
                <Box component="span" sx={{width: '90vh', height: '70vh', backgroundColor: 'white', zIndex:1}}>
                <ImageList sx={{ width: '80vh', height: '60vh', position:'relative', left:'60px', top:'50px'}} cols={10}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.title}>
                        <IconButton sx={{border: "1px solid grey", borderRadius: 1, height: '100px'}}>
                            <ArticleIcon fontSize="large" />
                        </IconButton>
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
                        <ListItem button>
                            <ListItemText  primary="Profile" />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary="Invoices" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Reports" />
                        </ListItem>
                        <Divider  light />
                        <ListItem button>
                            <ListItemText primary="Blacklist" />
                        </ListItem>
                        </List>
                    </div>
                    <div className='logout' style={{position:'relative', top:'100px'}}>
                        <CusButton variant="contained" color="error">Log out</CusButton>
                    </div>
                </Box>
            </div>
        </div>
        );
    }
}



export default Main;