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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import trashIcon from "../../assets/icons/trash.png";
import viewIcon from "../../assets/icons/view.png";
import editIcon from "../../assets/icons/edit.png";
import { APPROVE_CUSTOMER_RESET } from "../../redux/constants/customerConstant";
import { useAlert } from "react-alert";
import { deleteNewsfunc, loadNews } from "../../redux/actions/newsAction";
import AddNews from "./AddNews";
import { DELETE_NEWS_RESET } from "../../redux/constants/newsConstant";
import { Link } from "react-router-dom";
import NewLoader from "../loader/NewLoader";
import { Typography } from "@mui/material";
import UpdateNews from "./UpdateNews";

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
const NewsList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setShowUpdateDrawer(false);
    setState({ ...state, [right]: open });
  };

  console.log(token?.access_token);

  const [pages, setPages] = useState(1);

  const [newsId, setNewsId] = useState("");

  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteNewsfunc(token?.access_token, newsId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleEdit = (right, open, editData) => {
    //console.log(delteData);
    setShowUpdateDrawer(true);
    setState({ ...state, [right]: open });
    setNewsId(editData);

  };
  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setNewsId(deleteData);
    setDeleteDialogOpen(true);
  };

  const { loadNewsLoading, loadNewsData } = useSelector(
    (state) => state.loadNews
  );
  const { approveCustomerSuccess } = useSelector(
    (state) => state.approveCustomers
  );

  console.log(loadNewsData);

  const { isNewsDeleted } = useSelector((state) => state.deleteNews);

  useEffect(() => {
    setDefaultLoader(true);

    if (isNewsDeleted) {
      alert.error("News Deleted Successfully!");

      dispatch({ type: DELETE_NEWS_RESET });
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

    const myForm = new FormData();
    myForm.set("is_active", 1);
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadNews(token?.access_token, myForm));
    }
  }, [dispatch, token, approveCustomerSuccess, alert, pages, isNewsDeleted]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadNewsLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>News List</h1>
                  <div className="customer-btn-div">
                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Add News
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
                      count={loadNewsData?.meta?.last_page}
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
                        <StyledTableCell align="center">Title</StyledTableCell>

                        <StyledTableCell align="center">
                          Short Description
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          Long Description
                        </StyledTableCell>

                        {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {loadNewsData?.data.length > 0 ? (
                      <TableBody>
                        {loadNewsData &&
                          loadNewsData?.data
                            // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <StyledTableRow key={row.id}>
                                <StyledTableCell width="100px" align="center">
                                  {row.title}
                                </StyledTableCell>
                                <StyledTableCell width="100px" align="center">
                                  {row.short_desc}
                                </StyledTableCell>
                                <StyledTableCell width="100px" align="center">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      WebkitLineClamp: "2",
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {row.long_desc}
                                  </Typography>
                                </StyledTableCell>
                                <StyledTableCell width="100px" align="center">
                                  <img
                                    className="ml-2"
                                    src={editIcon}
                                    onClick={() => handleEdit("right", true, row.id)}
                                    alt=""
                                  />
                                  <Link
                                    to={
                                      `/newsmanagement/newslistdetails/` +
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
                <Fragment>
                  <Dialog
                    fullScreen={fullScreen}
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this News?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes news will be deleted.
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
                    {showUpdateDrawer ? (
                          <UpdateNews setState={setState} pages={pages} newsId={newsId} loadNewsData={loadNewsData} />
                    ) : (
                      <AddNews setState={setState} pages={pages} />
                    )}
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

export default NewsList;
