import React from 'react';
import './Searching.css';
//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const style = (theme) => ({
    root: {
        marginTop: theme.spacing.unit * 0.5,
        backgroundColor:"rgb(93,175,240,0.2)",
        overflowX: 'auto',
        overflowY: 'scroll',
        height: "16.9vw",
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '2px 2px 2px 2px',
    },
    table: {
        backgroundColor:"rgb(93,175,240,0.2)",
    },
    cells: {
        color : 'rgb(93,175,240,0.2)',
        fontSize: '0.9vw',
        flex:1,
    },
    hr: {
        color:'white',
        fontSize:'1em',
        
    },
    title2: {
        fontSize: ".8rem",
        color:"white",
        paddingTop: '5px'},
});
class Search extends React.Component {
    state = {
        query: "",
        data: [],
        filteredData: [],
        customer_name:''
    };

    handleInputChange = event => {
        const query = event.target.value;
        
        var filteredData
        this.setState(prevState => {
        filteredData = prevState.data.filter(element => {
            // console.log(element.customer_number.toString(10).includes(query))
            return element.customer_name?element.customer_name.includes(query):null;
            });
            if(filteredData.length===0){
            filteredData = prevState.data.filter(element => {
                return (element.customer_number.toString(10).includes(query)?element.customer_name:null);
            });}
            const result = [];
            const map = new Map();
            for (const item of filteredData) {
                if(!map.has(item.customer_name)) {
                    map.set(item.customer_name, true);    // set any value to Map
                    result.push({
                        customer_name: item.customer_name,
                        customer_number: item.customer_number,
                        total_open_amount: item.total_open_amount
                });
            }
        }
        filteredData=result;
        return {
            query,
            filteredData
        };
        });
    };

    getData = () => {
        fetch(`http://localhost:8080/1728202/DisplayRecord2`)
        .then(response => response.json())
        .then(data => {
            const { query } = this.state;
            var filteredData;
            filteredData = data.filter(element => {
                return element.customer_name?element.customer_name.includes(query):null;
            });
            console.log(filteredData.length)
            if(filteredData===0){
                filteredData = data.filter(element => {
                    return (element.customer_number.toString(10).includes(query)?element.customer_name:null);
                });
            }

        const result = [];
        const map = new Map();
        for (const item of filteredData) {
            if(!map.has(item.customer_name)){
                map.set(item.customer_name, true);    // set any value to Map
                result.push({
                    customer_name: item.customer_name,
                    customer_number: item.customer_number,
                    total_open_amount:item.total_open_amount
                });
            }
        }
        filteredData=result;
            this.setState({
            data,
            filteredData
            });
        });
    };
    componentWillMount() {
        this.getData();
    }

    render()
    {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} style={{backgroundColor: "rgba(27,31,56,.9)"}}>
                <div className="Search">
                    <div class="grid_count">
                        <div class="wrap">
                            <input
                                autoid="search-text-field"
                                type="text" 
                                class="input" 
                                placeholder="Search for customer by customer name or number"   
                                value={this.state.query} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                </div>
                
                   
                
                    <Table classname={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell  style={{textDecoration:'none',color:'white'}} align="left"><b>Customer Name</b></TableCell>
                                <TableCell  style={{textDecoration:'none',color:'white'}} align="center"><b>Customer Number</b></TableCell>
                                <TableCell  style={{textDecoration:'none',color:'white'}} align="center"><b>Total Open Amount</b></TableCell>    
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.filteredData.map(p=> 
                            <TableRow key={p.id} height='5'>
                                <TableCell component="th" scope="row" align="left" style={{color:'white'}}>
                                    <Link style={{textDecoration:'none',color:'white'}} to={{
                                        pathname:`/customer-dashboard/${p.customer_name}/${p.customer_number}`, 
                                        aboutprops:{
                                            customer_name: p.customer_name,
                                            customer_number: p.customer_number,
                                        }
                                        }} >
                                        {p.customer_name}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link style={{textDecoration:'none',color:'white'}} to={{
                                        pathname:`/customer-dashboard/${p.customer_name}/${p.customer_number}`,
                                        aboutprops:{
                                            customer_name: p.customer_name,
                                            customer_number: p.customer_number,
                                        }
                                        }} >
                                        {p.customer_number}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                <Link style={{textDecoration:'none',color:'white'}} to={{
                                        pathname:`/customer-dashboard/${p.customer_name}/${p.customer_number}`,
                                        aboutprops:{
                                            customer_name: p.customer_name,
                                            customer_number: p.customer_number,
                                        }
                                        }} >
                                        {p.total_open_amount}
                                    </Link>  
                                </TableCell>  
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>    
                </Paper>
            </div>
        );
    }
}
export default withStyles(style)(Search);