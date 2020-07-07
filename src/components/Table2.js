/* eslint-disable react/jsx-no-duplicate-props */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
//import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import DeleteIcon from '@material-ui/icons/Delete';
//import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import {callDummyAPI}  from '../services/services';
//import { Link } from 'react-router-dom';
import { CSVLink} from "react-csv";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'company_id', label: 'Company ID' },
  { id: 'acct_doc_header_id', label: 'Account Header ID' },
  { id: 'document_number', label: 'Document Number' },
  { id: 'business_code', label: 'Business Code' },
  { id: 'doctype', label: 'Document Type' },
  { id: 'customer_number', label: 'Customer Number' },
  { id: 'fk_customer_map_id', label: 'Customer Map ID' },
  { id: 'customer_name', label: 'Name of Customer' },
  { id: 'document_create_date', label: 'Document Create Date' },
  { id: 'baseline_create_date', label: 'Baseline Date' },
  { id: 'invoice_date_norm', label: 'Invoice Date' },
  { id: 'invoice_id', label: 'Invoice ID' },
  { id: 'total_open_amount', label: 'Total Open Amount' },
  { id: 'cust_payment_terms', label: 'Customer Payment Terms' },
  { id: 'clearing_date', label: 'Clear Date' },
  { id: 'isOpen', label: 'Is Open Invoice' },
  { id: 'ship_date', label: 'Shipping Date' },
  { id: 'paid_amount', label: 'Payment Amount' },
  { id: 'dayspast_due', label: 'Days Past Due Date' },
  { id: 'document_id', label: 'Doc ID' },
  { id: 'document_creation_date', label: 'Document Create Date' },
  { id: 'disputed_amount', label: 'Actual Amount Outstanding' },
  { id: 'invoice_age', label: 'Age of Invoice' },
  { id: 'invoice_amount_doc_currency', label: 'Invoice Currency' },
  { id: 'payment_method', label: 'Predicted Payment Type' },
  { id: 'predicted_amount', label: 'Predicted Amount' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
               style={mystyle.title2}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell style={mystyle.darkbg}
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip style={mystyle.title}
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel style={mystyle.title}
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      open : false, 

    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true, 
    })
  };
  
  handleClose = () => {
    
    const { select,} = this.props;
    console.log("select", select); 
    const c = select[0];
    callDummyAPI(c,document.getElementById("openAmount").value,document.getElementById("doctype").value)
        this.setState({ open: false });
        if(!document.getElementById("openAmount").value&&!document.getElementById("doctype").value)
         {
           console.log("empty");
         }
         else
         {
           window.location.reload();
         }
  };
  
  handlecancel=()=>{
  this.setState({ open: false });
  }
  filterSelected=()=>{
    const { select, data } = this.props;
    const res = []; 
    //let i = 0; 
    for(const item of select){
      for(const item2 of data){
        if(item2.invoice_id === item){
          res.push(item2);
          break;  
        }
      }
    }

    console.log("selected row = ", res);          
    return res; 
  }
  render(){
    const { numSelected, classes } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
          <Grid>
          <Button autoid="modify-button" onClick={this.handleClickOpen} variant='outlined' style={{backgroundColor:'#252c48',margin:3 }}><text style={{color:"white"}}>Modify</text></Button>
          <CSVLink filename={"1728202_ExportedData.csv"} style={{color:'white', textDecoration: 'none'}} data={this.filterSelected()}><Button variant='outlined' autoid="export-button" style={{backgroundColor:"#252c48",margin:3}}><text style={{color:"white"}}>Export</text></Button></CSVLink>
          </Grid>
          ) : (
            <Grid>
            <Button variant="outlined" style={{ backgroundColor: '#252c48', margin:3 }} disabled className={classes.button}><text style={{color:"white"}}>
              Modify
              </text>
            </Button>
            <Button variant="outlined" style={{backgroundColor: '#252c48', margin:3}} disabled className={classes.button}><text style={{color:"white"}}>
            Export
            </text>
            </Button>
            </Grid>
          )}        
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
        <Grid container>
            <Grid item sm>
          <text autoid="total-open-invoices-customer" style={{color:"rgba(255,255,255,.8)",marginRight:50,}}><b>{this.props.count}</b><br></br>Total open invoices</text>  
            </Grid>
            <Typography>
            {this.props.totalOpenInvoice}
            </Typography>
                      
                     {/* <text color='white'>Total open invoices</text>
                     <text>  {props.totalOpenInvoice} </text>    */}
            </Grid>
            <Grid item sm>
            <text autoid="total-open-amount-customer" style={{color:"rgba(255,255,255,.8)",marginRight:50,}}><b>{this.props.sum}</b><br></br>Total open Amount</text>
            <Typography>
                {this.props.totalOpenAmount}
            </Typography>
            </Grid>

        </div>

        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="mod"  >
            <DialogTitle  id="mod" style={{textDecoration:'bold', color:'white',backgroundColor:'#1B1F38'}}>
              <Typography color="inherit" variant="subtitle1" style={{color: "white",fontSize: "2rem"}}>
                Modify
              </Typography>
            </DialogTitle>
            <DialogContent style={{backgroundColor:'#1B1F38'}}>
            <form name="myform" method="post" action="/jason">
              <InputLabel htmlFor="Open Amount" style={{color:'white'}}>Open Amount</InputLabel>
              <TextField
                // autoFocus
                autoid = "open-amount-input"
                margin = "dense"
                id = "openAmount"
                label = "Open Amount"
                type = "number"
                fullWidth
              />
              {/* mmsmsm <Input align='end' type='text'/>  */}
              <InputLabel htmlFor="ship to" style={{color:'white'}}>Document Type</InputLabel>
              <TextField
                autoid = "doctype-input"
                margin = "dense"
                id = "doctype"
                label = "Document Type"
                type = "text"
                fullWidth
              />
            </form>
          </DialogContent >
          <DialogActions style = {{backgroundColor:'#1B1F38'}}>
            <Button autoid = "modify-save-button" onClick={this.handleClose} >
              <Typography color="inherit" variant="subtitle1" style={{color: "white",fontSize: ".8rem"}}>
                Save
              </Typography>
            </Button>
            <Button autoid = "modify-cancel-button" onClick={this.handlecancel} >
              <Typography color="inherit" variant="subtitle1" style={{color: "white",fontSize: ".8rem"}}>
                Cancel
              </Typography>
            </Button>
          </DialogActions>
      </Dialog>

      </Toolbar>

    );
  };
  
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 0,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflow: 'auto',
    
  },
});

const mystyle={
  mybg: { 
    backgroundColor: "rgba(27,31,56,.9)",

  },
  darkbg: {
    backgroundColor: "rgba(27,31,56,1)"
  },
  title: {fontSize: ".9rem",color:"rgba(255,255,255,.8)",fontWeight: 'normal',},
  title2: {fontSize: ".8rem",color:"white",},
}

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    page: 0,
    count:0,
    sum:0,
    rowsPerPage: 8,
	customer_name: '',
  };

  componentDidMount()
  {
     //var str = this.props.customer_name; 
      console.log("hi1",this.props.customer_name);
	  this.setState({customer_name: this.props.customer_name})
    
      axios.get(`http://localhost:8080/1728202/CustomerDetails`, {params:{customer_name: this.props.customer_name}})
      .then(response => {
          this.setState({data: response.data})
          console.log("hi2",response.data)
      })
      .catch(error => {
          console.log(error)
      })
      var count=0
      var sum=0
      this.state.data.forEach(element => {
        if(element.isOpen===1)
        {
          count=count+1;
          sum=sum+element.total_Open_Amount;
        }
        sum=sum+element.total_Open_Amount;
      });
      this.setState({
        count,sum
      })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.invoice_id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper style={{backgroundColor:"rgba(27,31,56,.9)"}} className={classes.root}>
        <EnhancedTableToolbar  sum={this.state.sum}count={this.state.count} select={this.state.selected} numSelected={selected.length} data={this.state.data}/>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} style={mystyle.darkbg} aria-labelledby="tableTitle">
            <EnhancedTableHead
              style={{color:"white"}}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.invoice_id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.invoice_id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.invoice_id}
                      selected={isSelected}
                    >
                      <TableCell style={mystyle.title} padding="checkbox">
                        <Checkbox checked={isSelected} style={mystyle.title2} />
                      </TableCell>
                      <TableCell style={mystyle.title2} component="th" scope="row" padding="none" align="center">
                        {n.company_id}
                      </TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.acct_doc_header_id}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.document_number}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.business_code}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.doctype}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.customer_number}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.fk_customer_map_id}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.customer_name}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.document_create_date}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.baseline_create_date}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.invoice_date_norm}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.invoice_id}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.total_open_amount}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.cust_payment_terms}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.clearing_date}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.isOpen}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.ship_date}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.paid_amount}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.dayspast_due}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.document_id}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.document_creation_date}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.disputed_amount}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.invoice_age}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.invoice_amount_doc_currency}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.payment_method}</TableCell>
                      <TableCell  style={mystyle.title2} align="right">{n.predicted_amount}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
        autoid="invoice-table-pagination-customer"
          style={{color:"white"}}
          rowsPerPageOptions={[8, 15, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          autoid="pagination-button-previous-customer"
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          autoid="pagination-button-next-customer"
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);