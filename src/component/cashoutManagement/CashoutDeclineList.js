import React from "react";
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

import { acceptNewCardAllotmenReq } from "../../redux/actions/cardManagementAction";
import { useAlert } from "react-alert";
import { useState } from "react";
import { useEffect } from "react";
import { loadCashoutDeclineListFunc } from "../../redux/actions/cashoutManagementAction";
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

const CashoutDeclineList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const [cardId, setCardId] = useState("");

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

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

  const { loadCashoutDeclineListData } = useSelector(
    (state) => state.loadCashoutDeclineList
  );

  // console.log(loadCashoutDeclineListData);

  useEffect(() => {
    setDefaultLoader(true);
    if (acceptNewCardAllotmentReqSuccess) {
      alert.success("New Card Alloted Successfully!");
    }

    const myForm = new FormData();

    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadCashoutDeclineListFunc(token?.access_token, myForm));
    }
  }, [dispatch, token, acceptNewCardAllotmentReqSuccess, alert, pages]);

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
                  <h1>Cashout Decline List</h1>
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
                      count={loadCashoutDeclineListData?.meta?.last_page}
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
                        <StyledTableCell align="center">
                          Customer Type
                        </StyledTableCell>
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
                          Declined By
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {loadCashoutDeclineListData?.data.length > 0 ? (
                      <TableBody>
                        {loadCashoutDeclineListData &&
                          loadCashoutDeclineListData?.data
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
                                <StyledTableCell align="center">
                                  {row?.customer_type}
                                </StyledTableCell>
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
                                  {row?.declined_by.first_name +
                                    " " +
                                    row?.declined_by.last_name}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">
                                  {row?.status === 0 ? "Not Disbursed Yet!" : "Disbursed"}
                                </StyledTableCell> */}
                                {/* <StyledTableCell align="center">
                                  {row?.disbursed_at === null
                                    ? "N/A"
                                    : row?.disbursed_at}
                                </StyledTableCell> */}
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
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default CashoutDeclineList;
