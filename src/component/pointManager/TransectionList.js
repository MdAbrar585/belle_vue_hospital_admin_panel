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
import Loader from "../loader/Loader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import editIcon from "../../assets/icons/view.png";
import approveIcon from "../../assets/icons/check.png";

import {
  acceptNewCardAllotmenReq,
  loadAllotedCardListData,
  loadNewAllotmentCardReq,
} from "../../redux/actions/cardManagementAction";
import { useAlert } from "react-alert";
import CardAllotment from "../cardManagement/CardAllotment";
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
const TransectionList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const theme = useTheme();

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
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  console.log(token?.access_token);

  // const loadNewAllotmentCardReqData = {
  //   data: [],
  //   count: 12,
  //   totalPage: 2,
  //   limit: 10,
  //   page: 1,
  // };

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const { loadNewAllotmentCardReqLoading, loadNewAllotmentCardReqError } =
    useSelector((state) => state.loadNewAllotmentCardReq);

  const loadNewAllotmentCardReqData = {
    data: [],
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
  const [pages, setPages] = useState(
    loadNewAllotmentCardReqData?.page === undefined
      ? 1
      : loadNewAllotmentCardReqData?.page
  );
  //   console.log(loadNewAllotmentCardReqData);

  const handleApprove = (id) => {
    //console.log(delteData);
    setCardId(id);
    setOpen(true);
  };

  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(acceptNewCardAllotmenReq(token?.access_token, cardId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  const {
    acceptNewCardAllotmentReqLoading,
    acceptNewCardAllotmentReqSuccess,
    acceptNewCardAllotmentReqData,
  } = useSelector((state) => state.acceptNewCardAllotmentReq);

  useEffect(() => {
    setDefaultLoader(true);
    if (acceptNewCardAllotmentReqSuccess) {
      alert.success("New Card Alloted Successfully!");
    }
    if (token != null) {
      dispatch(loadNewAllotmentCardReq(token?.access_token));
    }
  }, [dispatch, token, acceptNewCardAllotmentReqSuccess, alert]);

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
                  <h1>Transection List</h1>
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
                      count={loadNewAllotmentCardReqData?.meta.total}
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
                        {/* <StyledTableCell align="center">Card No</StyledTableCell> */}
                        <StyledTableCell align="center">
                          Card Number
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          User Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Purchase Amount
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Referral Status
                        </StyledTableCell>

                        {/* <StyledTableCell align="center">
                        Created Date & Time
                      </StyledTableCell> */}
                        <StyledTableCell align="center">
                          Venture Name
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>

                    {loadNewAllotmentCardReqData?.data.length > 0 ? (
                      <TableBody>
                        {loadNewAllotmentCardReqData &&
                          loadNewAllotmentCardReqData?.data
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
                                  {row?.reason}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">
                                {row?.status === 0 ? "Not Disbursed Yet!" : "Disbursed"}
                              </StyledTableCell> */}
                                {/* <StyledTableCell align="center">
                                {row?.disbursed_at === null
                                  ? "N/A"
                                  : row?.disbursed_at}
                              </StyledTableCell> */}
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
                        <StyledTableCell align="center" colSpan="7">
                          <h6>No Data Found</h6>
                        </StyledTableCell>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </div>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default TransectionList;
