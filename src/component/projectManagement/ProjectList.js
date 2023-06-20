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
import { loadInternalUserData } from "../../redux/actions/userAction";
import Drawer from "@mui/material/Drawer";
import Loader from "../loader/Loader";
import AddProject from "./AddProject";
import { deleteProject, loadProject } from "../../redux/actions/projectAction";
import trashIcon from "../../assets/icons/trash.png";
import editIcon from "../../assets/icons/edit.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DELETE_PROJECT_RESET } from "../../redux/constants/projectConstant";
import { useAlert } from "react-alert";
import UpdateProject from "./UpdateProject";
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

const ProjectList = () => {
  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const alert = useAlert();

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [customerCatTypeDialogOpne, setCustomerCatTypeDialogOpne] =
    useState(false);

  const [projectId, setProjectId] = useState("");

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  const [stateUpdate, setStateUpdate] = useState({ right: false });

  const toggleDrawerUpdate = (anchorUpdate, open) => (event) => {
    setStateUpdate({ ...state, [anchorUpdate]: open });
  };

  const handleClickUpdate = (right, open, id) => {
    // console.log("click");
    setStateUpdate({ ...stateUpdate, [right]: open });
    setProjectId(id);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteProject(token?.access_token, projectId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setProjectId(deleteData);
    setDeleteDialogOpen(true);
  };

  const { isProjectDeleted } = useSelector((state) => state.deleteProject);

  // console.log(token?.access_token);

  const studentData = {
    data: [],
    count: 12,
    totalPage: 2,
    limit: 10,
    page: 1,
  };
  const [pages, setPages] = useState(1);
  const handleChange = (e, p) => {
    // console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { projectLoading, projectData, projectError } = useSelector(
    (state) => state.loadProjects
  );
  console.log(projectData);

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
    myForm.set("concern_type_id", 1);

    if (token != null) {
      dispatch(loadProject(token?.access_token, myForm));
    }
  }, [dispatch, token, pages, isProjectDeleted, alert]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {projectLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <div>
                <Navbar />

                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Project List</h1>
                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Add Project
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
                        count={projectData?.meta?.last_page}
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
                            Project Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Description
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Address
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {projectData?.data.length > 0 ? (
                        <TableBody>
                          {projectData &&
                            projectData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {/* {(studentData?.page - 1) * 10 + (index + 1)} */}
                                    {row.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.description}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.address}
                                  </StyledTableCell>
                                  <StyledTableCell width="100px" align="center">
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
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this Project?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes project will be deleted.
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
                    <AddProject
                      pages={pages}
                      setPages={setPages}
                      setState={setState}
                      handleClick={handleClick}
                    ></AddProject>
                  </Drawer>

                  <Drawer
                    anchorUpdate={"right"}
                    open={stateUpdate["right"]}
                    onClose={toggleDrawerUpdate("right", false)}
                  >
                    <UpdateProject
                      pages={pages}
                      setPages={setPages}
                      setState={setState}
                      setStateUpdate={setStateUpdate}
                      handleClick={handleClick}
                      projectId={projectId}
                      projectData={projectData}
                    ></UpdateProject>
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

export default ProjectList;
