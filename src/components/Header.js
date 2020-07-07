import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Top from "../components/Top";
import companyLogo from "../assets/companyLogo.svg";
import Professor from "../components/Professor";


const header = () => {
  const styles={
    appbar: {margin:"0rem"},
    bgstyle: {elevation: "0"},
    title: {fontSize: "1.5rem",margin:"0.5rem"},
    top: {textAlign: "center",marginLeft:"25%",paddingLeft: 50},
    topright: {textAlign: "center",marginLeft:"auto",paddingTop: 15},
    leftstyle: {color: 'white'},
    rightstyle: {
      backgroundColor:'orange',
      borderRadius: '10px',
      fontSize: '15px'
    }

  }
  return (
    <div>
      <AppBar position="static"  style={styles.appbar} elevation={0} >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={companyLogo} alt="logo" style={{width:'80%'}}/>
          </IconButton>
          <Typography variant="h6" color="inherit">
            <h1 style={styles.title}>ABC PRODUCTS</h1>
          </Typography>
          <div style={styles.top}>
            <Top />
            <div style={{color: '#1B1F38'}}>abc</div>
            </div>
          <div style={styles.topright}>
            <Professor/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
   );
}
export default header;