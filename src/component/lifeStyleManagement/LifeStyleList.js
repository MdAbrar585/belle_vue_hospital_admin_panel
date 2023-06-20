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
// import AddProject from "./AddProject";
import trashIcon from "../../assets/icons/trash.png";
import deactiveIcon from "../../assets/icons/x-mark.png";
import editIcon from "../../assets/icons/edit.png";
import viewIcon from "../../assets/icons/view.png";
import approveIcon from "../../assets/icons/check.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DELETE_PROJECT_RESET } from "../../redux/constants/projectConstant";
import { useAlert } from "react-alert";
import AddLifeStyle from "./AddLifeStyle";
import {
  activeDeactiveLifeStyleToggleFunc,
  loadLifeStyleFunc,
} from "../../redux/actions/lifeStyleAction";
import NewLoader from "../loader/NewLoader";
import UpdateLifeStyle from "./UpdateLifeStyle";
import LifeStyleDetails from "./LifeStyleDetails";
// import UpdateProject from "./UpdateProject";

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

const LifeStyleList = () => {
  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const alert = useAlert();

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [activeDialogOpen, setActiveDialogOpen] = useState(false);

  const [showLifeStyleUpdate, setShowLifeStyleUpdate] = useState(false);

  const [showLifeStyleDetails, setShowLifeStyleDetails] = useState(false);

  const [lifeStyleId, setLifeStyleId] = useState("");

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
    setShowLifeStyleUpdate(false);
    setShowLifeStyleDetails(false);
  };

  const handleActive = (activeData) => {
    //console.log(delteData);
    setLifeStyleId(activeData);
    setActiveDialogOpen(true);
  };

  const handleActiveDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(
        activeDeactiveLifeStyleToggleFunc(token?.access_token, lifeStyleId)
      );

      const myForm = new FormData();
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadLifeStyleFunc(token?.access_token, myForm));
      }
      // window.location.reload(false);

      ////console.log("Deleted");
    }
    console.log("No");

    setActiveDialogOpen(false);
  };

  const handleEdit = (right, open, editData) => {
    //console.log(delteData);
    setShowLifeStyleUpdate(true);
    setShowLifeStyleDetails(false);
    setState({ ...state, [right]: open });
    setLifeStyleId(editData);
  };

  const handleView = (right, open, editData) => {
    //console.log(delteData);
    setShowLifeStyleDetails(true);
    setState({ ...state, [right]: open });
    setLifeStyleId(editData);
  };

  const handleDeactive = (deleteData) => {
    //console.log(delteData);
    setLifeStyleId(deleteData);
    setDeleteDialogOpen(true);
  };

  const handleDeactiveDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(
        activeDeactiveLifeStyleToggleFunc(token?.access_token, lifeStyleId)
      );

      const myForm = new FormData();
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadLifeStyleFunc(token?.access_token, myForm));
      }
      ////console.log("Deleted");
      // window.location.reload(false);
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const { isProjectDeleted } = useSelector((state) => state.deleteProject);

  // console.log(token?.access_token);

  const [pages, setPages] = useState(1);
  const handleChange = (e, p) => {
    // console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { loadLifeStyleLoading, loadLifeStyleData } = useSelector(
    (state) => state.loadLifeStyle
  );
  console.log(loadLifeStyleData);

  useEffect(() => {
    setDefaultLoader(true);

    if (isProjectDeleted) {
      alert.error("Project Deleted Successfully!");

      dispatch({ type: DELETE_PROJECT_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    const myForm = new FormData();
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadLifeStyleFunc(token?.access_token, myForm));
    }
  }, [dispatch, token, pages, isProjectDeleted, alert]);
  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadLifeStyleLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <div>
                <Navbar />

                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Life Style List</h1>
                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Add Life Style
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
                        count={loadLifeStyleData?.meta?.last_page}
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
                            Offer Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Short Description
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Long Description
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Status
                          </StyledTableCell>
                          <StyledTableCell width="150px" align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {loadLifeStyleData?.data.length > 0 ? (
                        <TableBody>
                          {loadLifeStyleData &&
                            loadLifeStyleData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {/* {(studentData?.page - 1) * 10 + (index + 1)} */}
                                    {row.title}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.short_desc}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.long_desc}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.is_active === 1
                                      ? "Active"
                                      : "Not Activated Yet!"}
                                  </StyledTableCell>
                                  <StyledTableCell width="150px" align="center">
                                    <img
                                      className="ml-2"
                                      src={viewIcon}
                                      onClick={() =>
                                        handleView("right", true, row.id)
                                      }
                                      alt=""
                                    />
                                    <img
                                      className="ml-2"
                                      src={editIcon}
                                      onClick={() =>
                                        handleEdit("right", true, row.id)
                                      }
                                      alt=""
                                    />
                                    {row?.is_active !== 1 ? (
                                      <img
                                        className="ml-2"
                                        src={approveIcon}
                                        onClick={() => handleActive(row.id)}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="ml-2"
                                        src={deactiveIcon}
                                        onClick={() => handleDeactive(row.id)}
                                        alt=""
                                      />
                                    )}
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
                    open={deleteDialogOpen}
                    onClose={handleDeactiveDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to decline this Life Style?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes life style will be declined.
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
                        onClick={() => handleDeactiveDialogClose("Yes")}
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
                        onClick={() => handleDeactiveDialogClose("No")}
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {!showLifeStyleDetails && (
                    <Drawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                    >
                      {showLifeStyleUpdate ? (
                        <UpdateLifeStyle
                          loadLifeStyleData={loadLifeStyleData}
                          pages={pages}
                          setPages={setPages}
                          setState={setState}
                          handleClick={handleClick}
                          lifeStyleId={lifeStyleId}
                        />
                      ) : (
                        <AddLifeStyle
                          pages={pages}
                          setPages={setPages}
                          setState={setState}
                          handleClick={handleClick}
                        ></AddLifeStyle>
                      )}
                    </Drawer>
                  )}

                  {showLifeStyleDetails && (
                    <Drawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                    >
                      <LifeStyleDetails
                        pages={pages}
                        setPages={setPages}
                        setState={setState}
                        handleClick={handleClick}
                        lifeStyleId={lifeStyleId}
                        loadLifeStyleData={loadLifeStyleData}
                      ></LifeStyleDetails>
                    </Drawer>
                  )}

                  <Dialog
                    fullScreen={fullScreen}
                    open={activeDialogOpen}
                    onClose={handleActiveDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to Active this Life Style?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes life style will be activated.
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
                        onClick={() => handleActiveDialogClose("Yes")}
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
                        onClick={() => handleActiveDialogClose("No")}
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

export default LifeStyleList;
