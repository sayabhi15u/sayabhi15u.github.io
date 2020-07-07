import React, { Component } from 'react';
import Footer from '../components/Footer';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table2 from '../components/Table2';
import Paper from '@material-ui/core/Paper';
import Header2 from "../components/Header2";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  hellotext: {
    fontSize: '4vw',
    color: '#FFFFFFA6',
    height: '10vh',
  },
  hellotext1: {
    fontSize: '2.5vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext3: {
    fontSize: '1vw',
    marginTop: '5vh',
    padding: '0.5vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext2: {
    fontSize: '1.2vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext4: {
    fontSize: '1.5vw',
    marginTop: '2vh',
    padding: '1vh',
    color: '#FFFFFF',
  },
  searchBtn: {
    marginTop: '2vh',
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
  top: {textAlign: "center",marginLeft:"25%"},
  topright: {textAlign: "center",marginLeft:"auto",borderRadius:"20px",padding:"4px"},
  appbar: {margin:"-1rem"},
  bgstyle: {elevation:"0"},
  title: {fontsize:"1.5rem",margin:"0.5rem"},
  logo: {maxWidth: 100}

});

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name:'',
      customer_number:''
    };
  }
  
  

  componentDidMount() {}

  render() {

    const { classes } = this.props;
    console.log('Data', this.props);
    return (
      /*<Grid container className={classes.root} spacing={2} xs={12}>
        <Grid container style={{ height: '10vh'}} justify="center">
          <Grid
            item
            //style={{height:'40vh',width:'60vh',backgroundColor:'#252C48'}}
            alignItems="center"
            direction="column"
            container
          >
            <Header />
            <div style={{width:'100%'}}>
              <Table />
              <Footer />
            </div>
            
              
      
          </Grid>
        </Grid>
        
      </Grid>*/
      <Grid container spacing={16}>
        <Grid item  xs={12}>
          <Paper className={classes.paper}>
            <Header2 data={this.props.match.params.customer_name} data2={this.props.match.params.customer_number}/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><Table2 autoid="invoice-table-customer" customer_name={this.props.match.params.customer_name}/></Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Footer/>
        </Grid>
        
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerDetails);