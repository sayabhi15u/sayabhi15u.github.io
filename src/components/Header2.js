import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import IconButton from '@material-ui/core/IconButton';
import Top from "../components/Top";
//import TopRight from "../components/TopRight";
//import companyLogo from "../assets/companyLogo.svg"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import { Typography, Button } from '@material-ui/core';
import Professor from "../components/Professor";
import { Link } from 'react-router-dom';


const header = (props) => {
    const mystyles={
        appbar: {margin:"0rem"},
        bgstyle: {elevation: "0"},
        title: {fontSize: "1.5rem",margin:"0.5rem"},
        title2: {fontSize: "0.9rem",margin:"0.5rem",textAlign: "center"},
        top: {textAlign: "center",marginLeft:"25%",paddingLeft: 50},
        topright: {textAlign: "center",marginLeft:"auto",paddingTop: 20},

    }
       
  return (
    <div>
      <AppBar position="static"  style={mystyles.appbar} elevation={0} >
        <Toolbar>
        <Link style={{color:'white'}} to='/'>
          <ArrowBackIcon autoid="navigation-back-button"/>
        </Link>
          <Typography variant="h6" color="inherit">
            <h1 autoid="customer-name" style={mystyles.title}>{props.data}</h1>
            <div>
            <h4 autoid="customer-number" style={mystyles.title2}>{props.data2}</h4>
            </div>
          </Typography>
          <div style={mystyles.top}>
            <Top />
            <div style={{color: '#1B1F38'}}>abc</div>
          </div>
          <div style={mystyles.topright}>
            <Professor/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
   );
}

export default header;