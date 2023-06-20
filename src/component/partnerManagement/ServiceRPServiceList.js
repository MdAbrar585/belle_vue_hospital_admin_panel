import React from "react";
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
import { loadInternalUserData } from "../../redux/actions/userAction";
import Drawer from "@mui/material/Drawer";
import Loader from "../loader/Loader";
import {
  loadPartnerData,
  loadPartnerService,
} from "../../redux/actions/partnerAction";
import AddPartnerService from "./AddPartnerService";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import approveIcon from "../../assets/icons/check.png";
import { useAlert } from "react-alert";

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

const ServiceRPServiceList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  console.log(token?.access_token);
  const loadServiceList = {
    data: [
      {
        partner_name: "CO0001",
        email: "RQ0001",
        phone: "Abrar",
        service_name: "10/22/2022",
        service_type: "Akib Siddique",
        value: "01923123432",
        discount: "VIP",
       
      },
    ],
    links: {
      first: "http://127.0.0.1:8000/api/v1/admin/projects/all-projects?page=1",
      last: "http://127.0.0.1:8000/api/v1/admin/projects/all-projects?page=5",
      prev: null,
      next: "http://127.0.0.1:8000/api/v1/admin/projects/all-projects?page=2",
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 5,
      path: "http://127.0.0.1:8000/api/v1/admin/projects/all-projects",
      per_page: 2,
      to: 2,
      total: 1,
    },
  };
  const studentData = {
    data: [],
    count: 12,
    totalPage: 2,
    limit: 10,
    page: 1,
  };
  const [pages, setPages] = useState(
    studentData?.page === undefined ? 1 : studentData?.page
  );
  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { partnerServiceLoading, partnerServiceData, partnerServiceError } =
    useSelector((state) => state.loadPartnerService);

  const handleApprove = (deleteData) => {
    //console.log(delteData);
    // setCustomerId(deleteData);
    setOpen(true);
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      alert.success("Service Reuped Successfully");

      //   dispatch(approveCustomer(token?.access_token, customerId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  console.log(partnerServiceData);

  useEffect(() => {
    setDefaultLoader(true);

    if (token != null) {
      dispatch(loadPartnerService(token?.access_token));
    }
  }, [dispatch, token]);
  return (
    <>
      {!defaultLoader ? (
        <Loader />
      ) : (
        <>
          {partnerServiceLoading ? (
            <Loader />
          ) : (
            <div className="mr-1 ml-1">
              {/* <div className="d-flex justify-content-between">
                  <h1>Partner Service List</h1>
                  <Button
                    style={{ background: "#023047" }}
                    onClick={() => handleClick("right", true)}
                    variant="contained"
                  >
                    Add Partner Service
                  </Button>
                </div> */}
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
                    count={studentData?.totalPage}
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
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">Phone</StyledTableCell>
                      <StyledTableCell align="center">
                        Service Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Service Type
                      </StyledTableCell>
                      <StyledTableCell align="center">Value</StyledTableCell>
                      <StyledTableCell align="center">Discount</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  {loadServiceList?.data.length > 0 ? (
                    <TableBody>
                      {loadServiceList &&
                        loadServiceList?.data
                          // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                          .map((row, index) => (
                            <StyledTableRow key={row.id}>
                              {/* <StyledTableCell align="center">
                                  {row?.partner_name === null
                                    ? "N/A"
                                    : row?.partner_name}
                                </StyledTableCell> */}
                              <StyledTableCell align="center">
                                {row.partner_name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.email}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.phone}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.service_name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.service_type}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.value}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.discount}
                              </StyledTableCell>
                              <StyledTableCell width="100px" align="center">
                                <img
                                  src={approveIcon}
                                  onClick={() => handleApprove(row.id)}
                                  alt=""
                                />
                                {/* <img
                                  className="ml-2"
                                  src={trachIcon}
                                  onClick={() => handleDelete(row.id)}
                                  alt=""
                                /> */}
                              </StyledTableCell>
                              {/* <StyledTableCell align="center">
                                    {row.attributes.email}
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
            </div>
          )}
        </>
      )}
      <Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <AddPartnerService
            setState={setState}
            handleClick={handleClick}
          ></AddPartnerService>
        </Drawer>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to Confimr this Service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you click yes service will be redumped.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
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
    </>
  );
};

export default ServiceRPServiceList;
