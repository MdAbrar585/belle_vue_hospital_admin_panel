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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import {
  deleteUsers,
  loadInternalUserData,
} from "../../redux/actions/userAction";
import Drawer from "@mui/material/Drawer";
import trashIcon from "../../assets/icons/trash.png";
import editIcon from "../../assets/icons/edit.png";
import viewIcon from "../../assets/icons/view.png";
import printerIcon from "../../assets/icons/printer.png";
import "./UserManagement.css";
import AddUser from "./AddUser";
import Loader from "../loader/Loader";
import { DELETE_USER_RESET } from "../../redux/constants/userConstant";
import { useAlert } from "react-alert";
import UpdateUser from "./UpdateUser";
import AddDesignation from "./AddDesignation";
import AddUserType from "./AddUserType";
import { generateUserReportFunc } from "../../redux/actions/reportAction";
import { GENERATE_USER_REPORT_RESET } from "../../redux/constants/reportConstant";
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

const UserList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isGenerateBtnClick, setIsGenerateBtnClick] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [open, setOpen] = useState(false);

  const [projectId, setProjectId] = useState("");

  const [userId, setUserId] = useState("");

  const [state, setState] = useState({ right: false });

  const [designationDialogOpne, setDesignationDialogOpne] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  const [stateUpdate, setStateUpdate] = useState({ right: false });

  const [btnLoader, setBtnLoader] = useState(false);

  const toggleDrawerUpdate = (anchorUpdate, open) => (event) => {
    setStateUpdate({ ...stateUpdate, [anchorUpdate]: open });
  };
  const handleClickUpdate = (right, open, id) => {
    // console.log("click");
    setStateUpdate({ ...stateUpdate, [right]: open });
    setUserId(id);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteUsers(token?.access_token, projectId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // dispatch(approveCustomer(token?.access_token, customerId));
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

    setDesignationDialogOpne(false);
  };

  const handleDesignation = () => {
    setDesignationDialogOpne("true");
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setProjectId(deleteData);
    setDeleteDialogOpen(true);
  };

  const { isUserDeleted, deleteUserError } = useSelector(
    (state) => state.deleteUser
  );

  // console.log(token?.access_token);

  const studentData = {
    data: [],
    count: 12,
    totalPage: 2,
    limit: 10,
    page: 1,
  };
  const [pages, setPages] = useState(1);

  const handleImportButton = () => {
    //console.log(delteData);
    // setCustomerId(deleteData);
    setOpen(true);
  };

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { internalUserLoading, internalUserData, internalUserError } =
    useSelector((state) => state.loadInternalUser);
  console.log(internalUserData);

  const { generateUserReportData, generateUserReportSuccess } = useSelector(
    (state) => state.generateUserReport
  );

  console.log(generateUserReportData);

  const handlePrint = () => {
    console.log("print");
    setBtnLoader(true);
    dispatch(generateUserReportFunc(token?.access_token));
  };
  const handleDownload = () => {
    console.log("ddddddd------------");
    window.location.href = generateUserReportData;
    setIsGenerateBtnClick(false);
  };
  useEffect(() => {
    setDefaultLoader(true);

    if (generateUserReportSuccess) {
      setBtnLoader(false);
      alert.success("User Report Generated Successfully!");
      // window.location.href=generateUserReportData;
      dispatch({ type: GENERATE_USER_REPORT_RESET });
      setIsGenerateBtnClick(true);
    }

    if (deleteUserError) {
      console.log(deleteUserError.data.message);
      alert.error(deleteUserError.data.message);
    }
    if (isUserDeleted) {
      alert.error("User Deleted Successfully!");

      dispatch({ type: DELETE_USER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }
    const myForm = new FormData();

    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadInternalUserData(token?.access_token, myForm));
    }
  }, [
    dispatch,
    token,
    pages,
    isUserDeleted,
    alert,
    deleteUserError,
    generateUserReportSuccess,
  ]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {internalUserLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <div>
                <Navbar />

                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>User List</h1>
                    <div>
                      {/* <img onClick={()=> handlePrint()} style={{marginRight:"5px"}} src={printerIcon} alt="" /> */}
                      {!btnLoader && (
                        <Button
                          style={{
                            background: isGenerateBtnClick
                              ? "green"
                              : "#023047",
                            marginRight: "10px",
                          }}
                          onClick={
                            isGenerateBtnClick
                              ? () => handleDownload()
                              : () => handlePrint()
                          }
                          variant="contained"
                        >
                          {!isGenerateBtnClick ? "Generate Report" : "Download"}
                        </Button>
                      )}
                      {btnLoader && (
                        <button
                          style={{
                            padding: "6px 40px",
                            background: "#023047",
                            marginRight: "10px",
                          }}
                          className="btn btn-success"
                          type="button"
                          disabled
                        >
                          <span
                            class="spinner-border spinner-border-sm text-light"
                            role="status"
                          ></span>
                          <span class="visually-hidden">Generating Report...</span>
                        </button>
                      )}

                      <Button
                        style={{ background: "#023047", marginRight: "10px" }}
                        onClick={() => handleImportButton()}
                        variant="contained"
                      >
                        Add User Type
                      </Button>

                      <Button
                        style={{ background: "#023047", marginRight: "10px" }}
                        onClick={() => handleDesignation()}
                        variant="contained"
                      >
                        Add Designation
                      </Button>
                      <Button
                        style={{ background: "#023047" }}
                        onClick={() => handleClick("right", true)}
                        variant="contained"
                      >
                        Add User
                      </Button>
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
                        count={internalUserData?.meta?.last_page}
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
                            User Id
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            User Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Designation
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Phone No{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Email
                          </StyledTableCell>
                          <StyledTableCell width="200" align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {internalUserData?.data.length > 0 ? (
                        <TableBody>
                          {internalUserData &&
                            internalUserData?.data
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
                                    {row?.designation === null
                                      ? "N/A"
                                      : row?.designation.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.attributes.phone}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.attributes.email}
                                  </StyledTableCell>
                                  <StyledTableCell width="200" align="center">
                                    <img
                                      className="ml-2"
                                      src={editIcon}
                                      onClick={() =>
                                        handleClickUpdate("right", true, row.id)
                                      }
                                      alt=""
                                    />
                                    <img
                                      className="ml-2"
                                      src={trashIcon}
                                      onClick={() => handleDelete(row.id)}
                                      alt=""
                                    />
                                    <Link
                                      to={
                                        `/usermanagement/userprofile/` + row.id
                                      }
                                    >
                                      <img
                                        className="ml-2"
                                        src={viewIcon}
                                        // onClick={() => handleDelete(row.id)}
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
                </div>

                <Fragment>
                  <Dialog
                    // fullScreen={fullScreenLarge}
                    open={designationDialogOpne}
                    onClose={handleCustomerCatTypeDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ width: "100%" }}
                  >
                    <DialogActions>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          fontWeight: "900",
                          marginRight: "10px",
                        }}
                        onClick={() => handleCustomerCatTypeDialogClose("No")}
                      >
                        X
                      </button>
                    </DialogActions>
                    <DialogTitle
                      className="text-center"
                      id="responsive-dialog-title"
                    >
                      {"Add Designation"}
                    </DialogTitle>
                    <DialogContent>
                      <AddDesignation
                        handleCustomerCatTypeDialogClose={
                          handleCustomerCatTypeDialogClose
                        }
                      ></AddDesignation>
                      {/* <CustomerTypeList></CustomerTypeList> */}
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ width: "100%" }}
                  >
                    <DialogActions>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          fontWeight: "900",
                          marginRight: "10px",
                        }}
                        onClick={() => handleClose()}
                      >
                        X
                      </button>
                    </DialogActions>
                    <DialogTitle
                      className="text-center"
                      id="responsive-dialog-title"
                    >
                      {"Add User Type"}
                    </DialogTitle>
                    <DialogContent>
                      <AddUserType handleClose={handleClose}></AddUserType>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    fullScreen={fullScreen}
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this User?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes user will be deleted.
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

                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    <AddUser
                      setPages={setPages}
                      pages={pages}
                      setState={setState}
                      handleClick={handleClick}
                    ></AddUser>
                  </Drawer>

                  <Drawer
                    anchorUpdate={"right"}
                    open={stateUpdate["right"]}
                    onClose={toggleDrawerUpdate("right", false)}
                  >
                    <UpdateUser
                      setPages={setPages}
                      pages={pages}
                      setState={setState}
                      handleClick={handleClick}
                      userId={userId}
                      internalUserData={internalUserData}
                      setStateUpdate={setStateUpdate}
                    ></UpdateUser>
                  </Drawer>
                </Fragment>
              </div>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default UserList;
