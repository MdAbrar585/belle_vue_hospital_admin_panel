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
// import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import trashIcon from "../../assets/icons/trash.png";
import editIcon from "../../assets/icons/edit.png";
import viewIcon from "../../assets/icons/view.png";
import AddPartner from "./AddPartner";
import {
  deletePartners,
  loadPartnerData,
} from "../../redux/actions/partnerAction";
import { DELETE_PARTNER_RESET } from "../../redux/constants/partnerConstant";
import { useAlert } from "react-alert";
import UpdatePartner from "./UpdatePartner";
import AddPartnerType from "./AddPartnerType";
import { Link } from "react-router-dom";
import { generatePartnerReportFunc } from "../../redux/actions/reportAction";
import { GENERATE_PARTNER_REPORT_RESET } from "../../redux/constants/reportConstant";
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

const PartnerList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  let [defaultLoader, setDefaultLoader] = useState(false);

  const [partnerId, setPartnerId] = useState("");

  const [isGenerateBtnClick, setIsGenerateBtnClick] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [customerCatTypeDialogOpne, setCustomerCatTypeDialogOpne] =
    useState(false);

  const [state, setState] = useState({ right: false });

  const [open, setOpen] = useState(false);

  const [partnerTypeOpen, setPartnerTypeOpen] = useState(false);

  const [btnLoader, setBtnLoader] = useState(false);


  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  const [stateUpdate, setStateUpdate] = useState({ right: false });

  const toggleDrawerUpdate = (anchor, open) => (event) => {
    setStateUpdate({ ...stateUpdate, [anchor]: open });
  };
  const handleClickUpdate = (right, open, id) => {
    // console.log("click");
    setStateUpdate({ ...stateUpdate, [right]: open });
    setPartnerId(id);
  };

  const handleSubmitButton = () => {
    const myForm = new FormData();

    handleClose();
    // dispatch(uploadCustomerFromCsv(token?.access_token, myForm));
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // dispatch(approveCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    setPartnerTypeOpen(false);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deletePartners(token?.access_token, partnerId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setPartnerId(deleteData);
    setDeleteDialogOpen(true);
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

  const handlePartnerType = () => {
    setPartnerTypeOpen("true");
  };

  const { partnerLoading, partnerData, partnerError } = useSelector(
    (state) => state.loadPartners
  );
  console.log(partnerData);

  const { isPartnerDeleted } = useSelector((state) => state.deletePartner);

  const { generatePartnerReportData, generatePartnerReportSuccess } =
    useSelector((state) => state.generatePartnerReport);
  
  const handlePrint = () => {
    console.log("print");
    setBtnLoader(true);
    dispatch(generatePartnerReportFunc(token?.access_token));
  };
  
  const handleDownload = () => {
    console.log("ddddddd------------");
    window.location.href = generatePartnerReportData;
    setIsGenerateBtnClick(false);
  };

  useEffect(() => {
    setDefaultLoader(true);

    if (generatePartnerReportSuccess) {
      setBtnLoader(false);
      alert.success("Partner Report Generated Successfully!");
      // window.location.href=generatePartnerReportData;
      dispatch({ type: GENERATE_PARTNER_REPORT_RESET });
      setIsGenerateBtnClick(true);
    }
    if (isPartnerDeleted) {
      alert.error("Parnter Deleted Successfully!");

      dispatch({ type: DELETE_PARTNER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    const myForm = new FormData();

    // myForm.set("is_active", 1);
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadPartnerData(token?.access_token, myForm));
    }
  }, [
    dispatch,
    token,
    pages,
    isPartnerDeleted,
    alert,
    generatePartnerReportSuccess,
  ]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {partnerLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <div>
                <Navbar />

                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Partner List</h1>
                    <div>
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
                        onClick={() => handlePartnerType()}
                        variant="contained"
                      >
                        Add Partner Type
                      </Button>

                      <Button
                        style={{ background: "#023047" }}
                        onClick={() => handleClick("right", true)}
                        variant="contained"
                      >
                        Add Partner
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
                        count={partnerData?.meta?.last_page}
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
                            Partner Id
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Partner Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            C.P. Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            C.P. Phone Number{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Email
                          </StyledTableCell>
                          <StyledTableCell width="200" align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {partnerData?.data.length > 0 ? (
                        <TableBody>
                          {partnerData &&
                            partnerData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {/* {(studentData?.page - 1) * 10 + (index + 1)} */}
                                    {row.attributes.system_id === null
                                      ? "N/A"
                                      : row.attributes.system_id}
                                  </StyledTableCell>

                                  <StyledTableCell align="center">
                                    {row.attributes.partner_name === null
                                      ? "N/A"
                                      : row.attributes.partner_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.attributes.first_name +
                                      " " +
                                      row.attributes.last_name}
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
                                        `/partnermanagement/partnerlistdetails/` +
                                        row.id
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
                    fullScreen={fullScreen}
                    open={partnerTypeOpen}
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
                      {"Add Partner Type"}
                    </DialogTitle>
                    <DialogContent>
                      <AddPartnerType handleClose={handleClose} />
                    </DialogContent>
                  </Dialog>

                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    <AddPartner
                      setState={setState}
                      handleClick={handleClick}
                    ></AddPartner>
                  </Drawer>

                  <Drawer
                    anchorUpdate={"right"}
                    open={stateUpdate["right"]}
                    onClose={toggleDrawerUpdate("right", false)}
                  >
                    <UpdatePartner
                      setState={setState}
                      handleClick={handleClick}
                      partnerId={partnerId}
                      setStateUpdate={setStateUpdate}
                      partnerData={partnerData}
                    ></UpdatePartner>
                  </Drawer>

                  <Dialog
                    fullScreen={fullScreen}
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to decline this Partner?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes partner will be deleted.
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

export default PartnerList;
