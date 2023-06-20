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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CardAllotment from "./CardAllotment";
import { Link } from "react-router-dom";
import editIcon from "../../assets/icons/view.png";
import {
  createCardCounterFunc,
  loadAllotedCardListData,
  loadCardCounterFunc,
  loadCardType,
} from "../../redux/actions/cardManagementAction";
// import AddCustomer from "./AddCustomer";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CREATE_CARD_COUNTER_RESET } from "../../redux/constants/cardManagementConstant";
import { useAlert } from "react-alert";
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

const AllotedCardList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [open, setOpen] = useState(false);

  const [defineCardType, setDefineCardType] = useState(false);

  console.log(defineCardType);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // form validation rules
  const validationSchema = Yup.object().shape({
    cardType: Yup.string().required("Card Tyoe is required"),
    numberOfCards: Yup.string().required("Number Of Cards is required"),
    batchName: Yup.string().required("Batch Name is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  const handleCardType = (data) => {
    console.log(data);
    if (data === "1") {
      setDefineCardType(true);
    } else {
      setDefineCardType(false);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("batch", data.batchName);
    myForm.set("qty", data.numberOfCards);
    myForm.set("membership_card_type_id", data.cardType);
    // myForm.set("image", data.uploadFiles[0]);

    dispatch(createCardCounterFunc(token.access_token, myForm));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  console.log(token?.access_token);


  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleSubscription = () => {
    setOpen(true);
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      // console.log("Deleted");
    }
    setOpen(false);
  };

  const { allotedCardLoading, allotedCardData } = useSelector(
    (state) => state.loadAllotedCard
  );

  const { createCardCounterSuccess } = useSelector(
    (state) => state.createCardCounter
  );
  const [pages, setPages] = useState(
    allotedCardData?.page === undefined ? 1 : allotedCardData?.page
  );
  //   console.log(allotedCardData);
  const { loadCardTypeData } = useSelector((state) => state.loadCardType);

  const { loadCardCounterData } = useSelector(
    (state) => state.loadCardCounter
  );

  // console.log("loadCardCounterData", loadCardCounterData);

  useEffect(() => {
    setDefaultLoader(true);

    if (createCardCounterSuccess) {
      alert.success("Card Added Successfully!");
      setState({ right: false });
      // console.log("success", createCardCounterSuccess);
      dispatch({ type: CREATE_CARD_COUNTER_RESET });
      dispatch(loadCardCounterFunc(token?.access_token));
    }
    if (token != null) {
      dispatch(loadAllotedCardListData(token?.access_token));
      dispatch(loadCardType(token?.access_token));
      dispatch(loadCardCounterFunc(token?.access_token));
    }
  }, [dispatch, token, alert, createCardCounterSuccess]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {allotedCardLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Alloted Card List</h1>
                  <div>
                    <Button
                      className="mr-3"
                      style={{ background: "#023047" }}
                      onClick={() => handleSubscription()}
                      variant="contained"
                    >
                      Card Counter
                    </Button>
                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Allot Card
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
                      count={allotedCardData?.meta.total}
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
                          Card No
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Card Holder Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Card Type
                        </StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>

                        <StyledTableCell align="center">
                          Created Date & Time
                        </StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>

                    {allotedCardData?.data.length > 0 ? (
                      <TableBody>
                        {allotedCardData &&
                          allotedCardData?.data
                            // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">
                                  {row?.number}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.first_name + " " + row?.last_name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.membership_card_type === null
                                    ? "N/A"
                                    : row?.membership_card_type.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.status === 0
                                    ? "Not Disbursed Yet!"
                                    : "Disbursed"}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.disbursed_at === null
                                    ? "N/A"
                                    : row?.disbursed_at}
                                </StyledTableCell>
                                <StyledTableCell width="100px" align="center">
                                  <Link
                                    to={
                                      `/cardmanagement/allotedcardlistdetails/` +
                                      row.id
                                    }
                                  >
                                    <img
                                      className="mr-2"
                                      src={editIcon}
                                      // onClick={() => handleEdit(row.id)}
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
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        {/* <img src={crossIcon} alt="" onClick={handleClose} /> */}
                      </div>
                    </DialogTitle>
                    <DialogContent>
                      <h3 className="text-center">Add Cards</h3>
                      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label>Card Type</label>

                            <select
                              className="form-control"
                              {...register("cardType", { required: true })}
                              onChange={(e) => handleCardType(e.target.value)}
                            >
                              <option value="">Select Card Type</option>
                              {loadCardTypeData?.data &&
                                loadCardTypeData?.data.map((catData) => (
                                  <option value={catData.id}>
                                    {catData.name}
                                  </option>
                                ))}
                            </select>
                            <span className="text-danger">
                              {errors.cardType?.type === "required" &&
                                "Card Type is required"}
                            </span>
                          </div>
                          <div className="form-group col-md-12">
                            <label>Number Of Cards</label>
                            <input
                              type="number"
                              className={`form-control ${
                                errors.numberOfCards ? "is-invalid" : ""
                              }`}
                              {...register("numberOfCards", { required: true })}
                              placeholder="0"
                            />
                            <span className="invalid-feedback text-danger">
                              {errors.numberOfCards?.message}
                            </span>
                          </div>
                          <div className="form-group col-md-12">
                            <label>Batch Name</label>
                            <input
                              className={`form-control ${
                                errors.batchName ? "is-invalid" : ""
                              }`}
                              {...register("batchName", { required: true })}
                              placeholder="Batch Name"
                            />
                            <span className="invalid-feedback text-danger">
                              {errors.batchName?.message}
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
                                Created At
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Card Type
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Number Of Cards
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Batch Name
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>

                          {loadCardCounterData?.data.batches.length > 0 ? (
                            <TableBody>
                              {loadCardCounterData &&
                                loadCardCounterData?.data.batches
                                  // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                                  .map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                      <StyledTableCell align="center">
                                        "10/23/2022"
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row?.card_type.name}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row?.qty}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row?.batch}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                            </TableBody>
                          ) : (
                            <TableBody>
                              <StyledTableCell align="center" colSpan="4">
                                <h6>No Data Found</h6>
                              </StyledTableCell>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>
                      <div className="mt-3">
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
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    <CardAllotment
                      setState={setState}
                      handleClick={handleClick}
                    ></CardAllotment>
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

export default AllotedCardList;
