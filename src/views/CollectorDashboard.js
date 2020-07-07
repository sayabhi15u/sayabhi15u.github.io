import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import { Typography } from '@material-ui/core';
import { callDummyAPI } from '../services/services';
import Header from "../components/Header";
import Paper from '@material-ui/core/Paper';
import Table from "../components/Table";
import SearchTable2 from "../components/SearchTable2";
import Analytics from "../components/Analytics";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  bgstyle: {backgroundColor: "rgba(27,31,56,.85)",  textAlign:"center"},
  title: {fontSize: "1.5rem",color:"rgba(255,255,255,.8)",fontWeight: 'normal',paddingTop:"1.2rem"},
  title2: {fontSize: "1.2rem",color:"white",paddingBottom: "1.2rem", fontWeight: 'bold'},
  paper2: {
    backgroundColor: "#252C48",
    textAlign: "center",
    color: "#FFFFFFA6",
    //whiteSpace: "nowrap"
  },
  paper: {
    backgroundColor: 'rgb(93,175,240,0.5)',
    textAlign: "center",
    color: "#FFFFFFA6",
    //whiteSpace: "nowrap"
  },
  
  textStyle1: {
    color: '#FFFFFFA6',
    fontSize: '2.5vw',
    marginTop: '2vh',
  },
  textStyle2: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  textfield: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  nameInput: {
    fontSize: '1vw',
    color: '#FFFFFF',
  },
  notchedOutline: { borderWidth: '1px', borderColor: '#5DAAE0 !important' },
  searchBtn: {
    marginTop: '8vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
  searchBtnDisabled: {
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: 'white !important',
    background: '#FFFFFFa5',
    '&:hover': {
      cursor: 'default',
      backgroundColor: '#FFFFFFa5',
    },
  },
  topcircle:{
    borderRadius: "10px 10px 10px 10px",
  },
  tablestyle:{
    padding: "1rem",
  },
  marginright:{
    marginRight: "1rem",
  }

});
const mystyle = {
  color: "#FFFFFFA6",
  backgroundColor: "#252C48",
  textAlign: 'center',
  fontSize: '2vw',
  fontFamily: "Arial",
};
const mystyle2 = {
  color: "white",
  backgroundColor: "#252C48",
  textAlign: 'center',
  fontSize: '1.5vw',
  fontFamily: "Arial",
};

class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCustomers: 0,
      totalOpenAR: 0,
      avgDelay:0,
      totalOpenInv: 0
    };
    //this.handleNameChange = this.handleNameChange.bind(this);
    this.getData=this.getData.bind(this);
  }

  getData=(tC,tAR,aD,tOI)=>{
    this.setState({
        totalCustomers: tC,
        totalOpenAR: tAR,
        avgDelay:aD,
        totalOpenInv: tOI
    })
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleGetStarted = (e) => {
    callDummyAPI(this.state.name).then((response) => {
      // });
      this.setState({
        response: response.data.name,
        redirect: true,
        loading: false,
      });
    });
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div style={{backgroundColor: "rgba(27,31,56,1)"}}>
        <Header/>
      <div>
      <Grid container spacing={16}> 
        <Grid item xs={12}>
          <Paper className={classes.paper2}>
            <Grid container style={{flexGrow: 1, backgroundColor:'#1B1F38'}}>
              <Grid  item autoid="total-customers-text-collector"
                style={{
                  height: '20vh',
                  width: '24%',
                  marginRight: '1rem',
                  marginLeft:8,
                  backgroundColor: '#252C48',
                  textAlign: 'center',
                  borderRadius:'5px'
                }}><br/><br/>
                <Typography style={mystyle}>Total Customer</Typography>
                <Typography style={mystyle2}>{this.state.totalCustomers}</Typography>
              </Grid>
              <Grid item autoid="total-open-ar-text-collector"
                style={{
                  height: '20vh',
                  width: '24%',
                  marginRight: '1rem',
                  backgroundColor: '#252C48',
                  textAlign: 'center',
                  borderRadius:'5px'
                }}><br/><br/>
                <Typography style={mystyle}>Total Open AR</Typography>
                < Typography style={mystyle2}>{this.state.totalOpenAR}</Typography>
              </Grid>
              <Grid item autoid="average-days-delay-text-collector"
                style={{
                  height: '20vh',
                  width: '24%',
                  marginRight: '1rem',
                  backgroundColor: '#252C48',
                  borderRadius:'5px',
                  textAlign: 'center',
                }}><br/><br/>
                <Typography style={mystyle}>Average Days Delay</Typography>
                <Typography style={mystyle2}>{this.state.avgDelay}</Typography>
              </Grid>
              <Grid item autoid="total-open-invoice-text-collector"
                style={{
                  height: '20vh',
                  width: '23%',
                  backgroundColor: '#252C48',
                  textAlign: 'center',
                  borderRadius:'5px'
                }}><br/><br/>
                <Typography style={mystyle}>Total Open Invoices</Typography>
                <Typography style={mystyle2}>{this.state.totalOpenInv}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
       
        <Grid item xs={4}>
          <Paper className={classes.paper2} style={{ height: 208, marginLeft: 8}}>
            <Analytics onCallback={this.getData}/>
          </Paper>
          <br/>
          <Paper className={classes.paper} style={{ height: 259, marginLeft: 8}}>
            <SearchTable2/>
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper className={classes.paper} style={{marginRight: 8,marginTop:8 }}>
            <Table autoid="invoice-table-collector" />
          </Paper>
        </Grid>
      </Grid>
      </div>
        <Footer/>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(CollectorDashboard);