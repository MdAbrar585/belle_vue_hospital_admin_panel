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
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
// import editIcon from "../../assets/icons/view.png";
import approveIcon from "../../assets/icons/check.png";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  disburseCashoutReqFunc,
  loadCashoutApprovalListFunc,
} from "../../redux/actions/cashoutManagementAction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { DISBURSE_CASHOUT_REQ_RESET } from "../../redux/constants/cashoutManagementConstant";
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

const CashoutApprovalList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const theme = useTheme();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [cashoutReqId, setCashoutReqId] = useState("");

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    transectionId: Yup.string().required("Transection Id is required"),
    // uploadFiles: Yup.string().required("File is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.uploadFiles);

    const myForm = new FormData();

    myForm.set("trx_id", data.transectionId);
    myForm.set("trx_image", data.uploadFiles[0]);

    dispatch(disburseCashoutReqFunc(token.access_token, cashoutReqId, myForm));
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

  const [pages, setPages] = useState(1);
  //   console.log(loadNewAllotmentCardReqData);

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleApprove = (id) => {
    console.log(id);
    setCashoutReqId(id);
    setOpen(true);
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      // alert.success("Disbursed Successfully!");
      // setTimeout(() => {
      //   navigate("/cashoutmanagement/cashoutdisburselist");
      // }, 2000);
      // dispatch(acceptNewCardAllotmenReq(token?.access_token, cardId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  const { disburseCashoutReqSuccess } = useSelector(
    (state) => state.disburseCashoutReq
  );

  const { loadCashoutApprovalListData } = useSelector(
    (state) => state.loadCashoutApprovalList
  );

  // console.log(loadCashoutApprovalListData);

  useEffect(() => {
    setDefaultLoader(true);
    if (disburseCashoutReqSuccess) {
      alert.success("Cashout Request Disbursed Successfully!");
      setTimeout(() => {
        navigate("/cashoutmanagement/cashoutdisburselist");
      }, 2000);
      dispatch({ type: DISBURSE_CASHOUT_REQ_RESET });
      setOpen(false);
    }

    const myForm = new FormData();

    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadCashoutApprovalListFunc(token?.access_token, myForm));
    }
  }, [dispatch, token, disburseCashoutReqSuccess, alert, navigate, pages]);

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
                    <h1>Cashout Approved List</h1>
                    {/* <Button
                  style={{ background: "#023047" }}
                  onClick={() => handleClick("right", true)}
                  variant="contained"
                >
                  Allot Card
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
                        count={loadCashoutApprovalListData?.meta?.last_page}
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
                          {/* <StyledTableCell align="center">
                        Cash Out Id{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Request Id
                      </StyledTableCell> */}
                          <StyledTableCell align="center">
                            Approved By
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Approved Date
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Customer Name
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            Customer Phone No
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
                            Cash Out Medium
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Cash Out Amount
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">Trix Id</StyledTableCell> */}
                          <StyledTableCell align="center">
                            Disbursement Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {loadCashoutApprovalListData?.data.length > 0 ? (
                        <TableBody>
                          {loadCashoutApprovalListData &&
                            loadCashoutApprovalListData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  {/* <StyledTableCell align="center">
                                {row?.cashout_option.id}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.id}
                              </StyledTableCell> */}
                                  <StyledTableCell align="center">
                                    {row?.approved_by.first_name +
                                      " " +
                                      row?.approved_by.last_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.approved_at}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.user.first_name +
                                      " " +
                                      row?.user.last_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.user.phone}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.membership_card_type.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.cashout_option.points}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.payment_gateway.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.cashout_option.amount}
                                  </StyledTableCell>

                                  <StyledTableCell width="100px" align="center">
                                    <img
                                      className="mr-2"
                                      src={approveIcon}
                                      onClick={() => handleApprove(row.id)}
                                      alt=""
                                    />
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                        </TableBody>
                      ) : (
                        <TableBody>
                          <StyledTableCell align="center" colSpan="9">
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
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ width: "100%" }}
                  >
                    <DialogTitle
                      className="text-center"
                      id="responsive-dialog-title"
                    >
                      {"Do you want to disburse this Cashout Request?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group col-md-12">
                            <label>Transection Id</label>
                            <input
                              className={`form-control ${
                                errors.transectionId ? "is-invalid" : ""
                              }`}
                              {...register("transectionId", { required: true })}
                              placeholder="Please Input Transection Id"
                            />
                            <span className="invalid-feedback text-danger">
                              {errors.transectionId?.message}
                            </span>
                          </div>

                          <div
                            id="uploadField"
                            className="form-group col-md-12"
                          >
                            <label>Upload Picture</label>
                            <input
                              id="file"
                              style={{ border: "dashed #023047" }}
                              className="form-control"
                              {...register("uploadFiles", { required: false })}
                              placeholder="Upload Files"
                              type="file"
                              //   onChange={() => Filevalidation()}
                            />

                            <span className="text-danger">
                              {errors.uploadFiles?.type === "required" &&
                                "Upload Files is required"}
                            </span>
                          </div>
                          <div className="w-100 d-flex justify-content-center">
                            <input
                              className="custom-button"
                              type="submit"
                              value="Submit"
                              // onClick={() => handleClose("Yes")}
                            />
                          </div>
                        </form>
                      </DialogContentText>
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

export default CashoutApprovalList;
