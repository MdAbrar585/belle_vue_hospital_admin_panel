import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
// import AddProject from "./AddProject";
// import trashIcon from "../../assets/icons/trash.png";
// import editIcon from "../../assets/icons/edit.png";
// import approveIcon from "../../assets/icons/check.png";
// import viewIcon from "../../assets/icons/view.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAlert } from "react-alert";
import {
  approveOfferFunc,
  declineOfferFunc,
  loadOfferFunc,
} from "../../redux/actions/offerAction";
import AddOffer from "./AddOffer";
import NewLoader from "../loader/NewLoader";
import OfferDetails from "./OfferDetails";
import UpdateOffer from "./UpdateOffer";
import OfferCard from "./OfferCard";
import { DELETE_OFFER_RESET } from "../../redux/constants/offerConstant";
// import UpdateProject from "./UpdateProject";


const OfferList = () => {
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

  const [projectId, setProjectId] = useState("");

  const [offerId, setOfferId] = useState("");

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
    setShowOfferDetailsDrawer(false);
    setShowOfferEditDrawer(false);
  };

  const [showOfferDetailsDrawer, setShowOfferDetailsDrawer] = useState(false);

  const [showOfferEditDrawer, setShowOfferEditDrawer] = useState(false);

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(declineOfferFunc(token?.access_token, projectId));

      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadOfferFunc(token?.access_token, myForm));
      }
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };
  const handleActiveDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(approveOfferFunc(token?.access_token, projectId));

      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadOfferFunc(token?.access_token, myForm));
      }
      ////console.log("Deleted");
    }
    console.log("No");

    setActiveDialogOpen(false);
  };
  // const handleActive = (activeData) => {
  //   //console.log(delteData);
  //   setProjectId(activeData);
  //   setActiveDialogOpen(true);
  // };

  // const handleDelete = (deleteData) => {
  //   //console.log(delteData);
  //   setProjectId(deleteData);
  //   setDeleteDialogOpen(true);
  // };

  // const handleView = (right, open, viewData) => {
  //   //console.log(delteData);
  //   setShowOfferEditDrawer(false);
  //   setOfferId(viewData);
  //   setShowOfferDetailsDrawer(true);
  //   // setDeleteDialogOpen(true);
  //   setState({ ...state, [right]: open });
  // };

  // const handleEdit = (right, open, viewData) => {
  //   //console.log(delteData);
  //   setOfferId(viewData);
  //   setShowOfferEditDrawer(true);
  //   // setDeleteDialogOpen(true);
  //   setState({ ...state, [right]: open });
  // };

  const { isOfferDeleted } = useSelector((state) => state.deleteOffer);

  // console.log(token?.access_token);

  const [pages, setPages] = useState(1);
  const handleChange = (e, p) => {
    // console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { loadOfferLoading, loadOfferData } = useSelector(
    (state) => state.loadOffer
  );
  console.log(loadOfferData);

  useEffect(() => {
    setDefaultLoader(true);

    if (isOfferDeleted) {
      alert.error("Offer Deleted Successfully!");

      dispatch({ type: DELETE_OFFER_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    const myForm = new FormData();
    myForm.set("per_page", 6);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadOfferFunc(token?.access_token, myForm));
    }
  }, [dispatch, token, pages, isOfferDeleted, alert]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadOfferLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <div>
                <Navbar />

                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Offer List</h1>
                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Add Offer
                    </Button>
                  </div>

                  <Stack spacing={2}>
                    <Pagination
                      className="mt-2 mr-4"
                      count={loadOfferData?.meta?.last_page}
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
                  <div className="row mt-4">
                    {loadOfferData?.data?.map((offerData, i) => (
                      <OfferCard
                        key={i}
                        loadOfferData={loadOfferData}
                        offerId={offerId}
                        offerData={offerData}
                        setState={setState}
                        pages={pages}
                      ></OfferCard>
                    ))}
                  </div>
                  {/* <div className="user-table-header">
                    
                    <Stack spacing={2}>
                      <Pagination
                        className="mt-2 mr-4"
                        count={loadOfferData?.meta?.last_page}
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
                            Points
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Status
                          </StyledTableCell>
                          <StyledTableCell width="150px" align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {loadOfferData?.data.length > 0 ? (
                        <TableBody>
                          {loadOfferData &&
                            loadOfferData?.data
                              .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {row.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.short_desc}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.long_desc}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.points}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.is_active === 1
                                      ? "Active"
                                      : "Not Activated Yet!"}
                                  </StyledTableCell>
                                  <StyledTableCell width="150px" align="center">
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
                                      src={viewIcon}
                                      onClick={() =>
                                        handleView("right", true, row.id)
                                      }
                                      alt=""
                                    />
                                    {row.is_active !== 1 ? (
                                      <img
                                        className="ml-2"
                                        src={approveIcon}
                                        onClick={() => handleActive(row.id)}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="ml-2"
                                        src={trashIcon}
                                        onClick={() => handleDelete(row.id)}
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
                  </TableContainer> */}
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
                      {"Do you want to decline this Offer?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes offer will be declined.
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
                  {!showOfferEditDrawer && (
                    <Drawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                    >
                      {showOfferDetailsDrawer ? (
                        <OfferDetails
                          loadOfferData={loadOfferData}
                          offerId={offerId}
                        />
                      ) : (
                        <AddOffer
                          pages={pages}
                          setPages={setPages}
                          setState={setState}
                          handleClick={handleClick}
                        ></AddOffer>
                      )}
                    </Drawer>
                  )}

                  {showOfferEditDrawer && (
                    <Drawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                    >
                      <UpdateOffer
                        loadOfferData={loadOfferData}
                        offerId={offerId}
                        pages={pages}
                        setState={setState}
                      />
                      {/* {showOfferDetailsDrawer ? (
                        <OfferDetails
                          loadOfferData={loadOfferData}
                          offerId={offerId}
                        />
                      ) : (
                        <AddOffer
                          pages={pages}
                          setPages={setPages}
                          setState={setState}
                          handleClick={handleClick}
                        ></AddOffer>
                      )} */}
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
                      {"Do you want to Active this Offer?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you click yes offer will be activated.
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

export default OfferList;
