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
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
// import editIcon from "../../assets/icons/view.png";
import approveIcon from "../../assets/icons/check.png";
import trashIcon from "../../assets/icons/trash.png";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  approveCashoutReqFunc,
  createCashoutOptionFunc,
  declineCashoutReqFunc,
  deleteCashoutOptionFunc,
  loadCashoutOptionListFunc,
  loadCashoutReqListFunc,
} from "../../redux/actions/cashoutManagementAction";
import {
  APPROVE_CASHOUT_REQ_RESET,
  CLEAR_ERRORS,
  CREATE_CASHOUT_OPTION_RESET,
  DECLINE_CASHOUT_REQ_RESET,
} from "../../redux/constants/cashoutManagementConstant";
import { useForm } from "react-hook-form";
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

const CashoutRequestList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const theme = useTheme();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [openDialogue, setOpenDialogue] = useState(false);

  const [cashoutReqId, setCashoutReqId] = useState("");

  const [cashoutOptionReqId, setCashoutOptionReqId] = useState("");

  // const [cashoutOptionId, setCashoutOptionId] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteCashoutOptionDialogOpen, setDeleteCashoutOptionDialogOpen] =
    useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [pages, setPages] = useState(1);

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    numberOfPoints: Yup.string().required("Points is required"),
    amountOfPoints: Yup.string().required("Amount is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("points", data.numberOfPoints);
    myForm.set("amount", data.amountOfPoints);
    myForm.set("membership_card_type_id", data.cardType);
    // myForm.set("image", data.uploadFiles[0]);

    dispatch(createCashoutOptionFunc(token.access_token, myForm));
  };

  console.log(token?.access_token);

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

  //   console.log(loadNewAllotmentCardReqData);

  const handleApprove = (id) => {
    console.log(id);
    setCashoutReqId(id);
    setOpen(true);
  };

  const handleSubscription = () => {
    setOpenDialogue(true);
  };

  const handleDialogueClose = (param) => {
    if (param === "Yes") {
      // console.log("Deleted");
    }
    setOpenDialogue(false);
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes", cashoutReqId);
      dispatch(approveCashoutReqFunc(token?.access_token, cashoutReqId));
      ////console.log("Deleted");
      // alert.success("Accepted Successfully!");
      // setTimeout(() => {
      //   navigate("/cashoutmanagement/cashoutapprovallist");
      // }, 2000);
    }
    setOpen(false);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    // setCustomerId(deleteData);
    setCashoutReqId(deleteData);

    setDeleteDialogOpen(true);
  };
  const handleDeleteCashoutOption = (deleteData) => {
    //console.log(delteData);
    // setCustomerId(deleteData);
    setCashoutOptionReqId(deleteData);

    setDeleteCashoutOptionDialogOpen(true);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // alert.success("Request Declined Successfully!");

      // setTimeout(() => {
      //   navigate("/cashoutmanagement/cashoutdeclinelist");
      // }, 2000);
      dispatch(declineCashoutReqFunc(token?.access_token, cashoutReqId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleDeleteCashoutOptionDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // alert.success("Request Declined Successfully!");

      // setTimeout(() => {
      //   navigate("/cashoutmanagement/cashoutdeclinelist");
      // }, 2000);
      dispatch(
        deleteCashoutOptionFunc(token?.access_token, cashoutOptionReqId)
      );
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteCashoutOptionDialogOpen(false);
  };

  const { approveCashoutReqSuccess } = useSelector(
    (state) => state.approveCashoutReq
  );

  const { declineCashoutReqSuccess } = useSelector(
    (state) => state.declineCashoutReq
  );

  const { loadCashoutReqListData } = useSelector(
    (state) => state.loadCashoutReqList
  );

  const { loadCashoutOptionListData } = useSelector(
    (state) => state.loadCashoutOptionList
  );

  const { createdCashoutOptionSuccess, createdCashoutOptionError } =
    useSelector((state) => state.createCashoutOption);

  const { deleteCashoutOptionSuccess } = useSelector(
    (state) => state.deleteCashoutOption
  );

  console.log(loadCashoutReqListData);

  useEffect(() => {
    setDefaultLoader(true);

    if (createdCashoutOptionError) {
      alert.error(createdCashoutOptionError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (deleteCashoutOptionSuccess) {
      alert.success("Cashout Option Deleted Successfully!");

      dispatch(loadCashoutOptionListFunc(token?.access_token));
    }

    if (createdCashoutOptionSuccess) {
      alert.success("Cashout Option Added Successfully!");
      setOpenDialogue(false);
      // console.log("success", createdCashoutOptionSuccess);
      dispatch({ type: CREATE_CASHOUT_OPTION_RESET });
      dispatch(loadCashoutOptionListFunc(token?.access_token));
    }

    if (approveCashoutReqSuccess) {
      alert.success("Accepted Successfully!");
      setTimeout(() => {
        navigate("/cashoutmanagement/cashoutapprovallist");
      }, 2000);
      dispatch({ type: APPROVE_CASHOUT_REQ_RESET });
    }

    if (declineCashoutReqSuccess) {
      alert.success("Declined Successfully!");
      setTimeout(() => {
        navigate("/cashoutmanagement/cashoutdeclinelist");
      }, 2000);
      dispatch({ type: DECLINE_CASHOUT_REQ_RESET });
    }

    const myForm = new FormData();

    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadCashoutReqListFunc(token?.access_token, myForm));
      dispatch(loadCashoutOptionListFunc(token?.access_token));
    }
  }, [
    dispatch,
    token,
    approveCashoutReqSuccess,
    declineCashoutReqSuccess,
    alert,
    navigate,
    createdCashoutOptionSuccess,
    createdCashoutOptionError,
    deleteCashoutOptionSuccess,
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

              <>
                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Cashout Request List</h1>
                    <Button
                      className="mr-3"
                      style={{ background: "#023047" }}
                      onClick={() => handleSubscription()}
                      variant="contained"
                    >
                      Add Cashout Option
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
                        count={loadCashoutReqListData?.meta?.last_page}
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
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {loadCashoutReqListData?.data.length > 0 ? (
                        <TableBody>
                          {loadCashoutReqListData &&
                            loadCashoutReqListData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell align="center">
                                    {"REQ00" + row?.id}
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
                                  <StyledTableCell width="100px" align="center">
                                    <img
                                      className="mr-2"
                                      src={approveIcon}
                                      onClick={() => handleApprove(row.id)}
                                      alt=""
                                    />
                                    <img
                                      className="mr-2"
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
                  <Dialog
                    fullScreen={fullScreen}
                    open={openDialogue}
                    onClose={handleDialogueClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        {/* <img src={crossIcon} alt="" onClick={handleClose} /> */}
                      </div>
                    </DialogTitle>
                    <DialogContent>
                      <h3 className="text-center">Cashout Options</h3>
                      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label>Points</label>
                            <input
                              type="number"
                              className={`form-control ${
                                errors.numberOfPoints ? "is-invalid" : ""
                              }`}
                              {...register("numberOfPoints", {
                                required: true,
                              })}
                              placeholder="0"
                            />
                            <span className="invalid-feedback text-danger">
                              {errors.numberOfPoints?.message}
                            </span>
                          </div>

                          <div className="form-group col-md-12">
                            <label>Amount</label>
                            <input
                              className={`form-control ${
                                errors.amountOfPoints ? "is-invalid" : ""
                              }`}
                              {...register("amountOfPoints", {
                                required: true,
                              })}
                              placeholder="0"
                            />
                            <span className="invalid-feedback text-danger">
                              {errors.amountOfPoints?.message}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center">
                          <input
                            className="add-user-button text-center"
                            type="submit"
                            value="Submit"
                          />
                        </div>
                      </form>

                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Points
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Amount
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Action
                              </StyledTableCell>
                              {/* <StyledTableCell align="center">
                          Batch Name
                        </StyledTableCell> */}
                            </TableRow>
                          </TableHead>

                          {loadCashoutOptionListData?.data.length > 0 ? (
                            <TableBody>
                              {loadCashoutOptionListData &&
                                loadCashoutOptionListData?.data
                                  // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                                  .map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                      <StyledTableCell align="center">
                                        {row.points}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.amount}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        <img
                                          className="ml-2"
                                          src={trashIcon}
                                          onClick={() =>
                                            handleDeleteCashoutOption(row.id)
                                          }
                                          alt=""
                                        />
                                      </StyledTableCell>
                                      {/* <StyledTableCell align="center">
                                      {row?.batch}
                                    </StyledTableCell> */}
                                    </StyledTableRow>
                                  ))}
                            </TableBody>
                          ) : (
                            <TableBody>
                              <StyledTableCell align="center" colSpan="2">
                                <h6>No Data Found</h6>
                              </StyledTableCell>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>
                      {/* <div className="mt-3">
                      <label>
                        {" "}
                        Total Card: {loadCardCounterData?.data.total_cards}
                      </label>
                    </div>
                    <div>
                      <label>
                        {" "}
                        Total Gold Card:{" "}
                        {loadCardCounterData?.data.total_gold_cards}
                      </label>
                    </div>
                    <div>
                      <label>
                        {" "}
                        Total Platinum Card:{" "}
                        {loadCardCounterData?.data.total_platinum_cards}
                      </label>
                    </div> */}
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to accept this cashout request?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes cashout request will be accepted.
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
                      {"Do you want to decline this Request?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes request will be declined.
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
                    fullScreen={fullScreen}
                    open={deleteCashoutOptionDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this Request?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes request will be deleted.
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
                        onClick={() =>
                          handleDeleteCashoutOptionDialogClose("Yes")
                        }
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
                        onClick={() =>
                          handleDeleteCashoutOptionDialogClose("No")
                        }
                      >
                        No
                      </Button>
                    </DialogActions>
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

export default CashoutRequestList;
