import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Loader from "../loader/Loader";
import {
  approveCustomer,
  declineCustomer,
  loadCustomer,
} from "../../redux/actions/customerAction";
import AddCustomer from "./AddCustomer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import approveIcon from "../../assets/icons/check.png";
import trashIcon from "../../assets/icons/trash.png";
import {
  APPROVE_CUSTOMER_RESET,
  DECLINE_CUSTOMER_RESET,
} from "../../redux/constants/customerConstant";
import { useAlert } from "react-alert";
// import AddCustomerType from "./customerType/AddCustomerType";
// import CustomerTypeList from "./customerType/CustomerTypeList";
import "./Customer.css";
import NewLoader from "../loader/NewLoader";
// import TablePagination from "@mui/material/TablePagination";
// import "./UserManagement.css";
// import AddUser from "./AddUser";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#023047",
    fontWeight: "900",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomerApprovalList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [open, setOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [customerCatTypeDialogOpne, setCustomerCatTypeDialogOpne] =
    useState(false);

  const [customerId, setCustomerId] = useState("");

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fullScreenLarge = useMediaQuery(theme.breakpoints.down("lg"));

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  console.log(token?.access_token);

  const studentData = {
    data: [],
    count: 12,
    totalPage: 2,
    limit: 10,
    page: 1,
  };
  const [pages, setPages] = useState(1);
  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleApprove = (deleteData) => {
    //console.log(delteData);
    setCustomerId(deleteData);
    setOpen(true);
  };
  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setCustomerId(deleteData);
    setDeleteDialogOpen(true);
  };
  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(approveCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  const handleCustomerCatTypeDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // dispatch(declineCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    console.log("No");

    setCustomerCatTypeDialogOpne(false);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(declineCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const { loadCustomerLoading, loadCustomerData, loadCustomerError } =
    useSelector((state) => state.loadCustomer);

  const {
    approveCustomerLoading,
    approveCustomerData,
    approveCustomerError,
    approveCustomerSuccess,
  } = useSelector((state) => state.approveCustomers);

  const { isDeleted } = useSelector((state) => state.declineCustomer);
  console.log(loadCustomerData);

  useEffect(() => {
    setDefaultLoader(true);

    if (approveCustomerSuccess) {
      // alert.success("Student Added Successfully");
      // navigate("/course");
      setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      console.log("success", approveCustomerSuccess);
      dispatch({ type: APPROVE_CUSTOMER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (isDeleted) {
      alert.success("Customer Declined Successfully!");

      dispatch({ type: DECLINE_CUSTOMER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    const myForm = new FormData();
    myForm.set("is_active", 0);
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadCustomer(token?.access_token, myForm));
    }
  }, [dispatch, token, approveCustomerSuccess, isDeleted, alert, pages]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadCustomerLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Customer Approval List</h1>
                  <div>
                    {/* <Button
                    style={{ background: "#023047", marginLeft: "10px" }}
                    onClick={() => handleClick("right", true)}
                    variant="contained"
                  >
                    Add Customer
                  </Button> */}
                  </div>
                </div>
                <div className="user-table-header">
                  {/* <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              component="div"
              count={ count }
              rowsPerPage={rowsPerPage}
              page={pages}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
                  <Stack spacing={2}>
                    <Pagination
                      className="mt-2 mr-4"
                      count={loadCustomerData?.meta?.last_page}
                      variant="outlined"
                      shape="rounded"
                      size="small"
                      page={pages}
                      color="info"
                      onChange={handleChange}
                      hidePrevButton
                      hideNextButton
                    />
                  </Stack>
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Customer Id
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Customer Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Profession
                        </StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>

                        <StyledTableCell align="center">
                          Phone No{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Active Status{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Action{" "}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>

                    {loadCustomerData?.data.length > 0 ? (
                      <TableBody>
                        {loadCustomerData &&
                          loadCustomerData?.data
                            // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <StyledTableRow key={row.id}>
                                <StyledTableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {/* {(studentData?.page - 1) * 10 + (index + 1)} */}
                                  {row.attributes.system_id}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.attributes.first_name +
                                    " " +
                                    row.attributes.last_name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.attributes.profession === null
                                    ? "N/A"
                                    : row?.attributes.profession}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.attributes.email}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.attributes.phone}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.attributes?.is_active === 0 ? (
                                    <span className="badge badge-danger">
                                      Not Approve Yet!
                                    </span>
                                  ) : (
                                    <span className="badge badge-success">
                                      Approved
                                    </span>
                                  )}
                                </StyledTableCell>

                                <StyledTableCell width="100px" align="center">
                                  <img
                                    src={approveIcon}
                                    onClick={() => handleApprove(row.id)}
                                    alt=""
                                  />
                                  <img
                                    className="ml-2"
                                    src={trashIcon}
                                    onClick={() => handleDelete(row.id)}
                                    alt=""
                                  />
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                      </TableBody>
                    ) : (
                      <TableBody>
                        <StyledTableCell align="center" colSpan="7">
                          <h6>No Data Found</h6>
                        </StyledTableCell>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <Fragment>
                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    <AddCustomer
                      setState={setState}
                      handleClick={handleClick}
                    ></AddCustomer>
                  </Drawer>

                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to approve this Customer?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes customer will be approved.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", padding: "40px" }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#023047",
                          padding: "12px 42px 12px 42px",
                          color: "#fff",
                        }}
                        onClick={() => handleClose("Yes")}
                        autoFocus
                      >
                        Yes
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#023047",
                          padding: "12px 42px 12px 42px",
                          color: "#fff",
                        }}
                        autoFocus
                        onClick={() => handleClose("No")}
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    fullScreen={fullScreen}
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to decline this Customer?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes customer will be declined.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", padding: "40px" }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#023047",
                          padding: "12px 42px 12px 42px",
                          color: "#fff",
                        }}
                        onClick={() => handleDeleteDialogClose("Yes")}
                        autoFocus
                      >
                        Yes
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#023047",
                          padding: "12px 42px 12px 42px",
                          color: "#fff",
                        }}
                        autoFocus
                        onClick={() => handleDeleteDialogClose("No")}
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Fragment>
              </div>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default CustomerApprovalList;
