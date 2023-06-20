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
import {
  approveCustomer,
  deleteCustomers,
  loadConcernTypeFunc,
  loadCustomer,
  loadCustomerDetailsFunc,
  uploadCustomerFromCsv,
} from "../../redux/actions/customerAction";
import AddCustomer from "./AddCustomer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import approveIcon from "../../assets/icons/check.png";
import {
  APPROVE_CUSTOMER_RESET,
  DELETE_CUSTOMER_RESET,
  UPLOAD_CUSTOMER_DATA_RESET,
} from "../../redux/constants/customerConstant";
import addFile from "../../assets/icons/add-image.png";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import viewIcon from "../../assets/icons/view.png";
import editIcon from "../../assets/icons/edit.png";
import search from "../../assets/icons/search.png";
import AddCustomerType from "./customerType/AddCustomerType";
import { loadProject } from "../../redux/actions/projectAction";
import trashIcon from "../../assets/icons/trash.png";
import NewLoader from "../loader/NewLoader";
import { generateCustomerReportFunc } from "../../redux/actions/reportAction";
import { GENERATE_CUSTOMER_REPORT_RESET } from "../../redux/constants/reportConstant";
import UpdateCustomer from "./UpdateCustomer";

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

const CustomerList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [impoertFileData, setImpoertFileData] = useState("");

  let [concernTypeFromDrpdwn, setConcernTypeFromDrpdwn] = useState("");

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [open, setOpen] = useState(false);

  const [filterActive, setFilterActive] = useState(false);

  const [filterData, setFilterData] = useState("");

  const [filterDataForSearchIcon, setFilterDataForSearchIcon] = useState("");

  const [customerId, setCustomerId] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [customerCatTypeDialogOpne, setCustomerCatTypeDialogOpne] =
    useState(false);

  const [isGenerateBtnClick, setIsGenerateBtnClick] = useState(false);

  const [btnLoader, setBtnLoader] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setShowUpdate(false);

    setState({ ...state, [right]: open });
  };
  const handleUpdateDrawerClick = (right, open, bottom, id) => {
    // console.log("click");
    setShowUpdate(true);
    setState({ ...state, [right]: open });

    setCustomerId(id);

    // setUpdateDrawerState({ ...setUpdateDrawer, [bottom]: open });
  };

  console.log(token?.access_token);

  const [pages, setPages] = useState(1);

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleImportButton = () => {
    //console.log(delteData);
    // setCustomerId(deleteData);
    setOpen(true);
  };

  const handleImportClick = (data) => {
    console.log("click", data);

    setImpoertFileData(data);

    // dispatch(uploadCustomerFromCsv(token?.access_token, myForm));
  };
  const handleConcernType = (data) => {
    console.log("click", data);
    console.log(impoertFileData);
    setConcernTypeFromDrpdwn(data);
    // const myForm = new FormData();
    // myForm.set("file", impoertFileData);
    if (impoertFileData !== "" && data !== "") {
      console.log("true");
    }

    // dispatch(uploadCustomerFromCsv(token?.access_token, myForm));
  };

  const handleSubmitButton = () => {
    console.log(impoertFileData, parseInt(concernTypeFromDrpdwn));
    const myForm = new FormData();
    myForm.set("file", impoertFileData);
    myForm.set("concern_type_id", parseInt(concernTypeFromDrpdwn));

    if (impoertFileData === "" && concernTypeFromDrpdwn === "") {
      console.log("true");
    } else {
      console.log("false");
    }
    handleClose();
    dispatch(uploadCustomerFromCsv(token?.access_token, myForm));
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(approveCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  const handleEdit = (editData) => {
    // console.log(editData);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteCustomers(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const { loadCustomerLoading, loadCustomerData } = useSelector(
    (state) => state.loadCustomer
  );

  const { uploadCustomerSuccess } = useSelector(
    (state) => state.uploadCustomer
  );

  const { concernTypeData } = useSelector((state) => state.loadConcernType);

  const { approveCustomerSuccess } = useSelector(
    (state) => state.approveCustomers
  );

  const { customerDetailsData } = useSelector(
    (state) => state.loadCustomerDetails
  );

  console.log(loadCustomerData);

  const handleCustomerCatTypeDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // dispatch(declineCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    console.log("No");

    setCustomerCatTypeDialogOpne(false);
  };

  const handleCustomerType = () => {
    setCustomerCatTypeDialogOpne("true");
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setCustomerId(deleteData);
    setDeleteDialogOpen(true);
  };

  const { isCustomerDeleted } = useSelector((state) => state.deleteCustomer);

  const { generateCustomerReportData, generateCustomerReportSuccess } =
    useSelector((state) => state.generateCustomerReport);

  const handlePrint = () => {
    // console.log("print");
    setBtnLoader(true);
    dispatch(generateCustomerReportFunc(token?.access_token));
  };

  const handleDownload = () => {
    // console.log("ddddddd------------");
    window.location.href = generateCustomerReportData;
    setIsGenerateBtnClick(false);
  };

  const searchByGlobalFunction = (data) => {
    console.log("click", data.target.value);
    setFilterDataForSearchIcon(data.target.value);
    if (data.key === "Enter") {
      if (data.target.value === "") {
        setFilterActive(false);
      } else {
        setFilterActive(true);
      }
      // console.log("do validate");
      setFilterData(data.target.value);
    }
  };
  const setSearchData = (data) => {
    // console.log("on change", data);

    setFilterDataForSearchIcon(data);

  }

  const searchByIcon = () => {
    // console.log("filterData", filterDataForSearchIcon);
    // console.log("click", data.target.value, data.key);
    // if (data.key === "Enter") {
    // if (data.target.value === "") {
    //   setFilterActive(false);
    // } else {
    //   setFilterActive(true);
    // }
    console.log("do validate");
    setFilterActive(true);
    setFilterData(filterDataForSearchIcon);
  };

  useEffect(() => {
    setDefaultLoader(true);
    console.log("1", isCustomerDeleted);

    if (generateCustomerReportSuccess) {
      setBtnLoader(false);
      alert.success("Customer Report Generated Successfully!");
      // window.location.href=generatePartnerReportData;
      dispatch({ type: GENERATE_CUSTOMER_REPORT_RESET });
      setIsGenerateBtnClick(true);
    }

    if (isCustomerDeleted) {
      console.log(isCustomerDeleted);
      alert.error("Customer Deleted Successfully!");

      dispatch({ type: DELETE_CUSTOMER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (approveCustomerSuccess) {
      // alert.success("Student Added Successfully");
      // navigate("/course");
      setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      console.log("success", approveCustomerSuccess);
      dispatch({ type: APPROVE_CUSTOMER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (uploadCustomerSuccess) {
      alert.success("Customer Imported Successfully!");
      // navigate("/course");
      // setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      // console.log("success", uploadCustomerSuccess);
      dispatch({ type: UPLOAD_CUSTOMER_DATA_RESET });

      const myForm = new FormData();
      myForm.set("is_active", 1);
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);
      dispatch(loadCustomer(token?.access_token, myForm));
    }

    // console.log(token?.access_token);
    if (token != null) {
      dispatch(loadConcernTypeFunc(token?.access_token));
      if (customerId !== "") {
        dispatch(loadCustomerDetailsFunc(token?.access_token, customerId));
      }
    }

    const myFormProject = new FormData();

    myFormProject.set("per_page", 10);
    myFormProject.set("page_number", pages);
    myFormProject.set("concern_type_id", 1);

    if (token != null) {
      dispatch(loadProject(token?.access_token, myFormProject));

      const myForm = new FormData();

      if (filterActive) {
        myForm.set("filter", filterData);
        myForm.set("per_page", 10);
        // myForm.set("page_number", pages);
        // setFilterActive(false)
      } else {
        myForm.set("per_page", 10);
        myForm.set("page_number", pages);
      }

      dispatch(loadCustomer(token?.access_token, myForm));
    }
  }, [
    dispatch,
    token,
    approveCustomerSuccess,
    uploadCustomerSuccess,
    alert,
    pages,
    isCustomerDeleted,
    generateCustomerReportSuccess,
    filterActive,
    filterData,
    customerId,
  ]);

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
                  <h1>Customer List</h1>
                  <div
                    className="customer-btn-div"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Import File."
                  >
                    {/* <label htmlFor="addfile">
                      <span style={{ fontWeight: "900" }} className="mr-2">
                        Import Customer
                      </span>
                      <img className="mr-3" src={addFile} alt="" />
                          </label>
                      <input
                        id="addfile"
                        type="file"
                        // className="mr-3"
                        // style={{ background: "#023047" }}
                        onChange={(e) =>
                          handleImportClick(e.currentTarget.files[0])
                        }
                      // variant="contained"
                        /> */}

                    {!btnLoader && (
                      <Button
                        style={{
                          background: isGenerateBtnClick ? "green" : "#023047",
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
                          padding: "6px 30px",
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
                        <span class="visually-hidden">
                          Generating Report...
                        </span>
                      </button>
                    )}

                    <Button
                      style={{ background: "#023047", marginRight: "10px" }}
                      onClick={() => handleImportButton()}
                      variant="contained"
                    >
                      Import Customer
                    </Button>

                    <Button
                      style={{ background: "#023047", marginRight: "10px" }}
                      onClick={() => handleCustomerType()}
                      variant="contained"
                    >
                      Add Customer Type
                    </Button>

                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Add Customer
                    </Button>
                  </div>
                </div>

                <div className="form-group col-md-12">
                  {/* <label>Password</label> */}
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search By Fist Name,Last Name,Email & Phone"
                      style={{ marginLeft: "-12px" }}
                      onKeyDown={(e) => searchByGlobalFunction(e)}
                      onChange={(e) => setSearchData(e.target.value)}
                    />
                    <div
                      // onClick={togglePasswordVisiblity}
                      className="input-group-append"
                    >
                      <span className="input-group-text" id="basic-addon1">
                        <img
                          onClick={() => searchByIcon()}
                          style={{ cursor: "pointer" }}
                          src={search}
                          alt=""
                        />
                      </span>
                    </div>
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
                        <StyledTableCell width="250px" align="center">
                          Customer Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Concern Type
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Profession
                        </StyledTableCell>
                        <StyledTableCell width="150px" align="center">
                          Email
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          Phone No{" "}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                        Active Status{" "}
                      </StyledTableCell> */}
                        <StyledTableCell align="center">
                          Status{" "}
                        </StyledTableCell>
                        <StyledTableCell width="200px" align="center">
                          Action
                        </StyledTableCell>
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
                                    (row.attributes.last_name === null
                                      ? ""
                                      : row.attributes.last_name)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.concern_type.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.attributes.profession === null
                                    ? "N/A"
                                    : row?.attributes.profession}
                                </StyledTableCell>
                                <StyledTableCell width="150px" align="center">
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
                                <StyledTableCell width="300px" align="center">
                                  <Link
                                    to={
                                      `/customermanagement/customerdetail/` +
                                      row.id
                                    }
                                  >
                                    <img
                                      className="mr-2"
                                      src={viewIcon}
                                      onClick={() => handleEdit(row.id)}
                                      alt=""
                                    />
                                  </Link>
                                  <img
                                    className="ml-2"
                                    src={trashIcon}
                                    onClick={() => handleDelete(row.id)}
                                    alt=""
                                  />
                                  <img
                                    className="ml-2"
                                    src={editIcon}
                                    onClick={() =>
                                      handleUpdateDrawerClick(
                                        "right",
                                        true,
                                        "bottom",
                                        row.id
                                      )
                                    }
                                    alt=""
                                  />
                                </StyledTableCell>
                                {/* <StyledTableCell width="100px" align="center">
                                  
                                </StyledTableCell> */}
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
                    {!showUpdate ? (
                      <AddCustomer
                        pages={pages}
                        setState={setState}
                        handleClick={handleClick}
                      ></AddCustomer>
                    ) : (
                      <UpdateCustomer
                        pages={pages}
                        setState={setState}
                        handleClick={handleClick}
                        customerId={customerId}
                        customerDetailsData={customerDetailsData}
                      ></UpdateCustomer>
                    )}
                  </Drawer>

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
                      {"Import customer"}
                    </DialogTitle>
                    <DialogContent>
                      <div className="customer-btn-div col-md-12">
                        <label htmlFor="addfile">
                          <span style={{ fontWeight: "900" }} className="mr-2">
                            Import Customer
                          </span>
                          <img className="mr-3" src={addFile} alt="" />
                        </label>
                        <input
                          id="addfile"
                          type="file"
                          // className="mr-3"
                          // style={{ background: "#023047" }}
                          onChange={(e) =>
                            handleImportClick(e.currentTarget.files[0])
                          }
                          // variant="contained"
                        />
                        {/* <CustomerTypeList></CustomerTypeList> */}
                      </div>
                      <div className="form-group col-md-12">
                        <label>Concern Type</label>
                        <select
                          className="form-control"
                          // {...register("customerType", { required: true })}
                          onChange={(e) => handleConcernType(e.target.value)}
                        >
                          <option value="">Select Concern Type</option>
                          {concernTypeData &&
                            concernTypeData?.map((catData) => (
                              <option value={catData.id}>{catData.name}</option>
                            ))}
                        </select>
                        {/* <span className="text-danger">
                        {errors.customerType?.type === "required" &&
                          "Customer Type is required"}
                      </span> */}
                      </div>
                      <div className="col-md-12 w-100 d-flex justify-content-center">
                        <button
                          onClick={() => handleSubmitButton()}
                          className="add-user-button"
                        >
                          Submit
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    // fullScreen={fullScreenLarge}
                    open={customerCatTypeDialogOpne}
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
                      {"Add Customer Type"}
                    </DialogTitle>
                    <DialogContent>
                      <AddCustomerType
                        handleCustomerCatTypeDialogClose={
                          handleCustomerCatTypeDialogClose
                        }
                      ></AddCustomerType>
                      {/* <CustomerTypeList></CustomerTypeList> */}
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

export default CustomerList;
