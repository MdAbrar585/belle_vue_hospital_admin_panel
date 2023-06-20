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
  deletePartnerServiceFunc,
  loadPartnerService,
} from "../../redux/actions/partnerAction";
import AddPartnerService from "./AddPartnerService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import viewIcon from "../../assets/icons/view.png";
import trashIcon from "../../assets/icons/trash.png";
import editIcon from "../../assets/icons/edit.png";
import AddPartnerServiceType from "./partnerServiceType/AddPartnerServiceType";
import NewLoader from "../loader/NewLoader";
import { DialogContentText } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DELETE_PARTNER_SERVICE_RESET } from "../../redux/constants/partnerConstant";
import { useAlert } from "react-alert";
import UpdatePartnerServie from "./UpdatePartnerServie";

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

const PartnerServiceList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const theme = useTheme();

  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [customerCatTypeDialogOpne, setCustomerCatTypeDialogOpne] =
    useState(false);

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [serviceId, setServiceId] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
    setShowUpdateDrawer(false);
  };

  console.log(token?.access_token);

  const [pages, setPages] = useState(1);
  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deletePartnerServiceFunc(token?.access_token, serviceId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setServiceId(deleteData);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (right, open, editData) => {
    //console.log(delteData);
    setShowUpdateDrawer(true);
    setState({ ...state, [right]: open });
    setServiceId(editData);
  };

  const handleCustomerType = () => {
    setCustomerCatTypeDialogOpne("true");
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

  const { partnerServiceLoading, partnerServiceData } = useSelector(
    (state) => state.loadPartnerService
  );

  console.log(partnerServiceData);

  const { isPartnerServiceDeleted } = useSelector(
    (state) => state.deletePartnerService
  );

  useEffect(() => {
    setDefaultLoader(true);

    if (isPartnerServiceDeleted) {
      alert.error("Partner Service Deleted Successfully!");

      dispatch({ type: DELETE_PARTNER_SERVICE_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }
    const myForm = new FormData();
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadPartnerService(token?.access_token, myForm));
    }
  }, [dispatch, token, pages, isPartnerServiceDeleted, alert]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {partnerServiceLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />
              <>
                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Partner Service List</h1>
                    <div>
                      <Button
                        style={{ background: "#023047", marginRight: "5px" }}
                        onClick={() => handleClick("right", true)}
                        variant="contained"
                      >
                        Add Partner Service
                      </Button>
                      <Button
                        style={{ background: "#023047" }}
                        onClick={() => handleCustomerType()}
                        variant="contained"
                      >
                        Add Partner Service Type
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
                        count={partnerServiceData?.meta?.last_page}
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
                            Partner Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Email
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Phone
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Service Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Service Type
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Value
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Discount
                          </StyledTableCell>
                          <StyledTableCell width="150px" align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {partnerServiceData?.data.length > 0 ? (
                        <TableBody>
                          {partnerServiceData &&
                            partnerServiceData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  {/* <StyledTableCell align="center">
                                  {row?.partner_name === null
                                    ? "N/A"
                                    : row?.partner_name}
                                </StyledTableCell> */}
                                  <StyledTableCell align="center">
                                    {row.partner.partner_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.partner.email}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.partner.phone}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.service_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.service_type.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.value}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.discount}
                                  </StyledTableCell>
                                  <StyledTableCell width="150px" align="center">
                                    <Link
                                      to={
                                        `/partnermanagement/partnerservicelistdetails/` +
                                        row.id
                                      }
                                    >
                                      <img
                                        className="ml-2"
                                        src={viewIcon}
                                        // onClick={() =>
                                        //   handleEdit("right", true, row.id)
                                        // }
                                        alt=""
                                      />
                                    </Link>
                                    <img
                                      className="ml-2"
                                      src={editIcon}
                                      onClick={() =>
                                        handleEdit("right", true, row.id)
                                      }
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
                </div>

                <Fragment>
                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    {showUpdateDrawer ? (
                      <UpdatePartnerServie
                        serviceId={serviceId}
                        setState={setState}
                        handleClick={handleClick}
                        partnerServiceData={partnerServiceData}
                      />
                    ) : (
                      <AddPartnerService
                        setState={setState}
                        handleClick={handleClick}
                      ></AddPartnerService>
                    )}
                  </Drawer>

                  <Dialog
                    fullScreen={fullScreen}
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this Partner Service?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes partner service will be deleted.
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
                      {"Add Partner Service Type"}
                    </DialogTitle>
                    <DialogContent>
                      <AddPartnerServiceType
                        handleCustomerCatTypeDialogClose={
                          handleCustomerCatTypeDialogClose
                        }
                      ></AddPartnerServiceType>
                      {/* <CustomerTypeList></CustomerTypeList> */}
                    </DialogContent>
                  </Dialog>
                </Fragment>
              </>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default PartnerServiceList;
