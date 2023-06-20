import React, { Fragment } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import editIcon from "../../assets/icons/view.png";
// import approveIcon from "../../assets/icons/check.png";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { acceptNewCardAllotmenReq } from "../../redux/actions/cardManagementAction";
import { useAlert } from "react-alert";
import { useState } from "react";
import { useEffect } from "react";
import { loadCashoutDisburseListFunc } from "../../redux/actions/cashoutManagementAction";
import NewLoader from "../loader/NewLoader";
import CashoutReportModal from "./CashoutReportModal";
import { GENERATE_CASHOUT_REPORT_RESET } from "../../redux/constants/reportConstant";

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

const CashoutDisburseList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const theme = useTheme();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [cardId, setCardId] = useState("");

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  // console.log(token?.access_token);

  // const loadNewAllotmentCardReqData = {
  //   data: [],
  //   count: 12,
  //   totalPage: 2,
  //   limit: 10,
  //   page: 1,
  // };

  const { loadNewAllotmentCardReqLoading } = useSelector(
    (state) => state.loadNewAllotmentCardReq
  );

  const [pages, setPages] = useState(1);
  //   console.log(loadNewAllotmentCardReqData);
  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { acceptNewCardAllotmentReqSuccess } = useSelector(
    (state) => state.acceptNewCardAllotmentReq
  );

  const { loadCashoutDisburseListData } = useSelector(
    (state) => state.loadCashoutDisburseList
  );

  const { generateCashoutReportData, generateCashoutReportSuccess } =
    useSelector((state) => state.generateCashoutReport);

  console.log(loadCashoutDisburseListData);

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // dispatch(deleteNewsfunc(token?.access_token, newsId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    // setNewsId(deleteData);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    setDefaultLoader(true);
    if (acceptNewCardAllotmentReqSuccess) {
      alert.success("New Card Alloted Successfully!");
    }

    if (generateCashoutReportSuccess) {
      // setBtnLoader(false);
      alert.success("User Report Generated Successfully!");
      window.location.href = generateCashoutReportData;
      dispatch({ type: GENERATE_CASHOUT_REPORT_RESET });
      // setIsGenerateBtnClick(true);
      setDeleteDialogOpen(false);
    }

    const myForm = new FormData();

    myForm.set("per_page", 10);
    myForm.set("page_number", pages);
    if (token != null) {
      dispatch(loadCashoutDisburseListFunc(token?.access_token, myForm));
    }
  }, [
    dispatch,
    token,
    acceptNewCardAllotmentReqSuccess,
    generateCashoutReportSuccess,
    generateCashoutReportData,
    alert,
    pages,
  ]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadNewAllotmentCardReqLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Cashout Disbursed List</h1>
                  <Button
                    style={{ background: "#023047" }}
                    onClick={() => handleDelete()}
                    variant="contained"
                  >
                    Generate Report
                  </Button>
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
                      count={loadCashoutDisburseListData?.meta?.last_page}
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
                          Cash Out Request Id{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Customer Name
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                        Customer Type
                      </StyledTableCell> */}
                        <StyledTableCell align="center">
                          Customer Card Type
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Number of Reward Point
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          Cash Out Amount
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Cash Out Medium
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Trix Id
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Disbursement Date
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {loadCashoutDisburseListData?.data.length > 0 ? (
                      <TableBody>
                        {loadCashoutDisburseListData &&
                          loadCashoutDisburseListData?.data
                            // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">
                                  {row?.id}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.user.first_name +
                                    " " +
                                    row?.user.last_name}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">
                                {row?.customer_type}
                              </StyledTableCell> */}
                                <StyledTableCell align="center">
                                  {row?.membership_card_type.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.cashout_option.points}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.cashout_option.amount}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.payment_gateway.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.trx_id}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.disbursed_at}
                                </StyledTableCell>
                                {/* <StyledTableCell width="100px" align="center">
                                <img
                                  className="mr-2"
                                  src={approveIcon}
                                  onClick={() => handleApprove(row.id)}
                                  alt=""
                                />
                              </StyledTableCell> */}
                              </StyledTableRow>
                            ))}
                      </TableBody>
                    ) : (
                      <TableBody>
                        <StyledTableCell align="center" colSpan="8">
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
                  open={deleteDialogOpen}
                  onClose={handleDeleteDialogClose}
                  aria-labelledby="responsive-dialog-title"
                  style={{ width: "100%" }}
                >
                  <DialogTitle id="responsive-dialog-title">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>{"Generate Report"}</div>
                      <div>
                        <button
                          onClick={() => handleDeleteDialogClose("Yes")}
                          style={{ background: "none", border: "none" }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                    <CashoutReportModal />
                  </DialogContent>
                  {/* <DialogActions
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
                  </DialogActions> */}
                </Dialog>

                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  <CashoutReportModal />
                </Drawer>
              </Fragment>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default CashoutDisburseList;
