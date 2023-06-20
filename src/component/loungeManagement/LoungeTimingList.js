import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import trashIcon from "../../assets/icons/trash.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import active from "../../assets/icons/check.png";
import deactive from "../../assets/icons/disabled.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { deleteLoungeTimingFunc, loungeTimingToggleFunc } from "../../redux/actions/loungeManagementAction";
import Tooltip from "@mui/material/Tooltip";

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

const LoungeTimingList = ({ loadTimingByLounge, loungId }) => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  
  const [loungeTimingId, setLoungeTimingId] = useState("");
    
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [pages, setPages] = useState(1);

  const [timingId, setTimingId] = useState(1);

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setTimingId(deleteData);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteLoungeTimingFunc(token?.access_token, timingId));
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  const handlToggleDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(loungeTimingToggleFunc(token?.access_token, loungeTimingId));
      ////console.log("Deleted");
    }
    // console.log("No");

    setToggleDialogOpen(false);
  };

  const handleToggle = (deleteData) => {
    //console.log(delteData);
    setLoungeTimingId(deleteData);
    setToggleDialogOpen(true);
  };
  console.log("loadTimingByLounge", loadTimingByLounge);
  return (
    <div>
      <h1>Lounge Timing List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>

              <StyledTableCell align="center">From Time</StyledTableCell>

              <StyledTableCell align="center">To Time</StyledTableCell>

              {/* <StyledTableCell align="center">Status</StyledTableCell> */}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          {loadTimingByLounge?.data.length > 0 ? (
            <TableBody>
              {loadTimingByLounge &&
                loadTimingByLounge?.data
                  // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell width="100px" align="center">
                        {row.lounge.name}
                      </StyledTableCell>

                      <StyledTableCell width="100px" align="center">
                        {row.from}
                      </StyledTableCell>

                      <StyledTableCell width="100px" align="center">
                        {row.to}
                      </StyledTableCell>
                      <StyledTableCell width="100px" align="center">
                        {row.is_active === 0 ? (
                          <Tooltip title="Not Active Yet! Click Here To Active.">
                            <img
                              className="ml-2"
                              src={active}
                              onClick={() => handleToggle(row.id)}
                              alt=""
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Click Here To Deactive.">
                            <img
                              className="ml-2"
                              src={deactive}
                              onClick={() => handleToggle(row.id)}
                              alt=""
                            />
                          </Tooltip>
                        )}

                        <img
                          className="ml-2"
                          src={trashIcon}
                          onClick={() => handleDelete(row.id)}
                          alt=""
                        />
                        {/* <Link to={`/newsmanagement/newslistdetails/` + row.id}>
                          <img
                            className="ml-2"
                            src={viewIcon}
                            // onClick={() => handleDelete(row.id)}
                            alt=""
                          />
                        </Link> */}
                      </StyledTableCell>
                      {/* <StyledTableCell width="100px" align="center">
                                {row.is_active === 1 ? (
                                  <span className="badge badge-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge badge-success">
                                    InActive
                                  </span>
                                )}
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

      <Dialog
        fullScreen={fullScreen}
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="responsive-dialog-title"
        style={{ textAlign: "center", width: "100%" }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Do you want to delete this Timing?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you click yes timing will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
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
          open={toggleDialogOpen}
          onClose={handlToggleDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"If You Want To Confirm Click Yes!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* If you click yes lounge will be deleted. */}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              onClick={() => handlToggleDialogClose("Yes")}
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
              onClick={() => handlToggleDialogClose("No")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default LoungeTimingList;
