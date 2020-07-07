import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import ChatBot from "./ChatBot";
import voice from "../assets/voiceIcon.svg"

const styles = {
  list: {
    width: 300,
    marginTop: 40
  },
  fullList: {
    width: "auto"
  },
  paper: {
    background: "#252C48",
    border: '1px solid orange',
  }
};

class Professor extends React.Component {
  state = {
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  onClose = (side, close) => () => {
    this.setState({
      [side]: close
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div >
        <Button
        autoid="professor-button"
          onClick={this.toggleDrawer("right", true)}
          style={{ float: "right",fontSize:'0.8rem',backgroundColor: "orange", borderRadius: "20px",
          padding:6,color:'#fff' ,height:30,marginBottom:25}}
        >
          <b>PROFESSOR</b>
          <img src={voice} alt="logo" style={{width:'20%'}}/>

        </Button>

        <SwipeableDrawer
          classes={{ paper: classes.paper }}
          
          anchor="right"
          open={this.state.right}
          style={{overflow: 'hidden'}}
          //visible={this.state.visible}
        >
          <div
            tabIndex={0}
            role="button"
          >
            <div style={{ paddingTop: 15,paddingLeft: 15 ,color : '#FFFFFFA6'}}>
            PROFESSOR
             <button 
             autoid="professor-close-button"
              style={{ float: "right" ,marginRight:15,color : '#FFFFFFA6',fontSize:'30',backgroundColor: '#47385C'}}>
             <CloseIcon onClick={this.toggleDrawer("right", false)}/>
              </button> 
            </div>
            <ChatBot/>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Professor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Professor);

//bgstyle: {backgroundColor: "orange", borderRadius: "10px", margin: "16px"},
        //title: {fontSize: "0.8rem",color:"white",padding:"8px"},



