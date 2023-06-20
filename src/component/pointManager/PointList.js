import React, { Fragment, useEffect, useState } from "react";
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
  loadCustomer,
} from "../../redux/actions/customerAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import viewIcon from "../../assets/icons/view.png";
import { APPROVE_CUSTOMER_RESET } from "../../redux/constants/customerConstant";
import { loadPointListDataFunc } from "../../redux/actions/pointManagerAction";
import { Link } from "react-router-dom";
import NewLoader from "../loader/NewLoader";

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

const PointList = () => {
  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [open, setOpen] = useState(false);

  const [customerId, setCustomerId] = useState("");

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(approveCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  
  const { loadCustomerLoading, loadCustomerError } = useSelector(
    (state) => state.loadCustomer
  );

  const {
    pointListLoading,
    pointListData,
    pointListError
  } = useSelector((state) => state.loadPointList);
  // console.log(loadCustomerData);

  useEffect(() => {
    setDefaultLoader(true);
    // if (approveCustomerSuccess) {
    //   alert.success("Student Added Successfully");
    //   navigate("/course");
    //   setState({ right: false });
    //   dispatch(loadCourseData(token.accessToken, 1));
    //   console.log("success", approveCustomerSuccess);
    //   dispatch({ type: APPROVE_CUSTOMER_RESET });
    //   dispatch(loadCustomer(token?.access_token));
    // }

    const myForm = new FormData();
    myForm.set("is_active", 1);
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadPointListDataFunc(token?.access_token, myForm));
    }
  }, [dispatch, token,pages ]);

  return (
    <div>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {pointListLoading ? (
            <NewLoader />
          ) : (
            <div className="">
              <div className="d-flex justify-content-between">
                <h1>Point List</h1>
                {/* <Button
                  style={{ background: "#023047" }}
                  onClick={() => handleClick("right", true)}
                  variant="contained"
                >
                  Add Vendor
                </Button> */}
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
                    count={pointListData?.meta?.last_page}
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
                        Customer Phone Number
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        Customer Type
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Customer Card Type
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        Available Point
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                      {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                    </TableRow>
                  </TableHead>

                  {pointListData?.data.length > 0 ? (
                    <TableBody>
                      {pointListData &&
                        pointListData?.data
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
                                { row.attributes.first_name +" "+ row.attributes.last_name }
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.attributes.phone}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.user_type.name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.card_type.name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.available_points}
                              </StyledTableCell>

                              <StyledTableCell width="100px" align="center">
                              <Link
                                  to={
                                    `/pointmanagement/pointmanagementdetails/` +
                                    row.id
                                  }
                                >
                                <img
                                  src={viewIcon}
                                  // onClick={() => handleApprove(row.id)}
                                  alt=""
                                  />
                                  </Link>
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
                  {/* <AddVendor></AddVendor> */}
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
              </Fragment>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PointList;
