/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import axios from "axios";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
//import "./table.css";

let counter = 0;
function createData(
  pk_id,
  acct_doc_header_id,
  company_id,
  document_number,
  document_number_norm,
  business_code,
  create_year,
  document_line_number,
  doctype,
  customer_number,
  customer_number_norm,
  fk_customer_map_id,
  customer_name,
  division,
  document_create_date,
  document_create_date_norm,
  posting_date,
  posting_date_norm,
  posting_id,
  due_date,
  due_date_norm,
  order_date,
  order_date_norm,
  invoice_id,
  invoice_id_norm,
  baseline_create_date,
  invoice_date_norm,
  total_open_amount,
  total_open_amount_norm,
  cust_payment_terms,
  business_area,
  ship_date,
  ship_to,
  clearing_date,
  clearing_date_norm,
  reason_code,
  isOpen,
  discount_due_date_norm,
  debit_credit_indicator,
  payment_method,
  document_creation_date,
  invoice_currency,
  document_id,
  actual_open_amount,
  paid_amount,
  days_past_duedate,
  invoice_age,
  disputed_amount,
  predicted_payment_type,
  predicted_amount
) {
  counter += 1;
  return {
    id: counter,
    pk_id,
    acct_doc_header_id,
    company_id,
    document_number,
    document_number_norm,
    business_code,
    create_year,
    document_line_number,
    doctype,
    customer_number,
    customer_number_norm,
    fk_customer_map_id,
    customer_name,
    division,
    document_create_date,
    document_create_date_norm,
    posting_date,
    posting_date_norm,
    posting_id,
    due_date,
    due_date_norm,
    order_date,
    order_date_norm,
    invoice_id,
    invoice_id_norm,
    baseline_create_date,
    invoice_date_norm,
    total_open_amount,
    total_open_amount_norm,
    cust_payment_terms,
    business_area,
    ship_date,
    ship_to,
    clearing_date,
    clearing_date_norm,
    reason_code,
    isOpen,
    discount_due_date_norm,
    debit_credit_indicator,
    payment_method,
    document_creation_date,
    invoice_currency,
    document_id,
    actual_open_amount,
    paid_amount,
    days_past_duedate,
    invoice_age,
    disputed_amount,
    predicted_payment_type,
    predicted_amount,
  };
}

const rows = [
  { id: "company_id", label: "Company ID" },
  { id: "acct_doc_header_id", label: "Account Header ID" },
  { id: "document_number", label: "Document Number" },
  { id: "business_code", label: "Business Code" },
  { id: " doctype", label: "Document Type" },
  { id: "  customer_number", label: "Customer Number" },
  { id: " fk_customer_map_id", label: "Customer Map ID" },
  { id: "customer_name", label: "Name Of Customer" },
  { id: "document_create_date", label: "Document Create Date" },
  { id: "baseline_create_date", label: "Baseline Date" },
  { id: "invoice_date_norm", label: " Invoice Date" },
  { id: "invoice_id", label: " Invoice ID" },
  { id: " total_open_amount", label: "Total Open Amount" },
  { id: "cust_payment_terms", label: " Customer Payment Terms" },
  { id: "clearing_date", label: "Clear Date" },
  { id: " isOpen", label: "Is Open Invoice" },
  { id: "  ship_date", label: "  Shipping Date" },
  { id: "paid_amount", label: "Payment Amount" },
  { id: "days_past_duedate", label: "Days past Due date" },
  { id: " document_id", label: "  Doc Id" },
  { id: "actual_open_amount", label: " Actual Amount Outstanding" },
  { id: "invoice_age", label: "Age of Invoice" },
  //{ id: "age_invoice", label: "Age of Invoice" },
  { id: "invoice_currency", label: "Invoice Currency" },
  { id: "predicted_payment_type", label: "Predicted Payment Type" },
  { id: "predicted_amount", label: "Predicted Amount" },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell
            padding="checkbox"
            style={{
              color: "white",
            }}
          >
            <Checkbox
              style={{
                color: "white",
              }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            (row) => (
              <TableCell
                style={{
                  color: "white",
                }}
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
              >
                {row.label}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "rgb(36,44,71)",
    overflowx:'auto',
    color: "white",
  },
  root2: {
    paddingRight: theme.spacing.unit,
  },
  table: {
    minWidth: 400,
   // maxHeight: 7,
    color: "white",
  },
  tableWrapper: {
    overflow: "scroll",
    color: "white",
    marginLeft: "3.5vh",
    marginRight: "3.5vh",
    // marginBottom:'1vh',
    backgroundColor: "rgb(27,31,56)",
  },
  highlight: {},
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 6,
    };
    this.predictHandler = this.predictHandler.bind(this);
  }

  /*state = {
   // order: 'asc',
   // orderBy: 'calories',
    selected: [],
    data: [
      
      
    ],
    page: 0,
    rowsPerPage: 8,
  };*/

  getPosts() {
    axios
      // This is where the data is hosted
      .get(`http://localhost:8080/1728202/dummy.do`)
      // Once we get a response and store data, let's change the loading state
      .then((response) => {
        //console.log(response.data)
        let temp = [];

        for (var i = 0; i < response.data.length; i++) {
          temp.push(
            createData(
              response.data[i].pk_id,
              response.data[i].acct_doc_header_id,
              response.data[i].company_id,
              response.data[i].document_number,
              response.data[i].document_number_norm,
              response.data[i].business_code,
              response.data[i].create_year,
              response.data[i].document_line_number,
              response.data[i].doctype,
              response.data[i].customer_number,
              response.data[i].customer_number_norm,
              response.data[i].fk_customer_map_id,
              response.data[i].customer_name,
              response.data[i].division,
              response.data[i].document_create_date,
              response.data[i].document_create_date_norm,
              response.data[i].posting_date,
              response.data[i].posting_date_norm,
              response.data[i].posting_id,
              response.data[i].due_date,
              response.data[i].due_date_norm,
              response.data[i].order_date,
              response.data[i].order_date_norm,
              response.data[i].invoice_id,
              response.data[i].invoice_id_norm,
              response.data[i].baseline_create_date,
              response.data[i].invoice_date_norm,
              response.data[i].total_open_amount,
              response.data[i].total_open_amount_norm,
              response.data[i].cust_payment_terms,
              response.data[i].business_area,
              response.data[i].ship_date,
              response.data[i].ship_to,
              response.data[i].clearing_date,
              response.data[i].clearing_date_norm,
              response.data[i].reason_code,
              response.data[i].isOpen,
              response.data[i].discount_due_date_norm,
              response.data[i].debit_credit_indicator,
              response.data[i].payment_method,
              response.data[i].document_creation_date,
              response.data[i].invoice_amount_doc_currency,
              response.data[i].document_id,
              response.data[i].actual_open_amount,
              response.data[i].paid_amount,
              response.data[i].dayspast_due,
              response.data[i].invoice_age,
              response.data[i].disputed_amount
            )
          );
        }
        //console.log(temp);
        this.setState({
          data: temp,
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getPosts();
  }

  predictHandler = (e) => {
    console.log(this.state.data[this.state.selected-1]);
    var temp = [];
    for (var i = 0; i < this.state.selected.length; i++)
      temp.push(this.state.data[this.state.selected[i]-1]);
    console.log(temp);
    axios
      .post(
        "http://127.0.0.1:5000/predict?",
        {},
        {
          headers: { "Content-Type": "application/json" },
          params: {
            data: {
              id: "1728202",
              data: temp,
            },
          },
        }
      )
      .then((response) => {
        console.log(response.data[0]);
        for (var i = 0; i < this.state.selected.length; i++) {
          this.state.data[this.state.selected[i]-1].predicted_amount =
            response.data[i].predictions;
          this.state.data[this.state.selected[i]-1].predicted_payment_type =
            response.data[i].payment_type;
          this.forceUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
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
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const numSelected = this.state.selected.length;
    return (
      <Paper
        autoid="invoice-table-collector"
        className={classes.root}
        style={{
          color: "white",
        }}
      >
        {/*}  <EnhancedTableToolbar numSelected={selected.length} rowselect={this.state.selected} style={{
                        
                      }}/>*/}
        <Toolbar
          style={{
            color: "white",
          }}
          className={classNames(classes.root2, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography
                variant="h6"
                id="tableTitle"
                style={{
                  color: "#CCCCCC",
                }}
              >
                Invoices
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div autoid="predict-button" className={classes.actions}>
        {numSelected > 0 ? (
          
          <Button variant="contained" style={{color: '#ffffff', backgroundColor: '#a0a0a0'}} className={classes.button} onClick={this.predictHandler}>
          Predict
          </Button>
        ) : (
          
            <Button variant="contained" style={{color: '#ffffff', backgroundColor: '#a0a0a0'}} disabled className={classes.button}>
              Predict
            </Button>
          
        )}
      </div>
        </Toolbar>
        <div
          className={classes.tableWrapper}
          style={{
            color: "white",
          }}
        >
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            style={
              {
                // color:'white'
              }
            }
          >
            <EnhancedTableHead
              style={{
                color: "white",
              }}
              numSelected={selected.length}
              //order={order}
              //orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              // onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              
              {this.state.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          style={{
                            color: "white",
                          }}
                        />
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.company_id}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.acct_doc_header_id}
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.document_number}
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.business_code}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.doctype}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.customer_number}
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.fk_customer_map_id}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.customer_name}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.document_create_date}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.baseline_create_date}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.invoice_date_norm}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.invoice_id}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.total_open_amount}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.cust_payment_terms}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.clearing_date}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.isOpen}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.ship_date}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.paid_amount}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.days_past_duedate}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.document_id}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.actual_open_amount}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.invoice_age}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.invoice_currency}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.predicted_payment_type}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                        }}
                        align="left"
                      >
                        {n.predicted_amount}
                      </TableCell>
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
          autoid="invoice-table-pagination-collector"
          style={{
            color: "white",
          }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          autoid="pagination-button-previous-collector"
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          autoid="pagination-button-next-collector"
          nextIconButtonProps={{
            "aria-label": "Next Page",
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