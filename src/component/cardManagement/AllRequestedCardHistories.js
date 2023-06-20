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
import Drawer from "@mui/material/Drawer";
import CardAllotment from "./CardAllotment";
// import editIcon from "../../assets/icons/view.png";
import { loadAllCardRequestedHistory } from "../../redux/actions/cardManagementAction";
import NewLoader from "../loader/NewLoader";
// import AddCustomer from "./AddCustomer";

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

const AllRequestedCardHistories = () => {
  const dispatch = useDispatch();

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

  // const loadAllRequestedCardHistoryData = {
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

  const {
    loadAllRequestedCardHistoryLoading,
    loadAllRequestedCardHistoryData,
  } = useSelector((state) => state.loadAllRequestedCardHistory);

  const [pages, setPages] = useState(
    loadAllRequestedCardHistoryData?.page === undefined
      ? 1
      : loadAllRequestedCardHistoryData?.page
  );
  //   console.log(loadAllRequestedCardHistoryData);

  useEffect(() => {
    setDefaultLoader(true);

    if (token != null) {
      dispatch(loadAllCardRequestedHistory(token?.access_token));
    }
  }, [dispatch, token]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadAllRequestedCardHistoryLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Requested Card List</h1>
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
                      count={loadAllRequestedCardHistoryData?.meta.total}
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
                          Card Number
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Card Holder Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Customer Id
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Request Purpose
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Card Type
                        </StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>

                        <StyledTableCell align="center">
                          Accepted By
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>

                    {loadAllRequestedCardHistoryData?.data.length > 0 ? (
                      <TableBody>
                        {loadAllRequestedCardHistoryData &&
                          loadAllRequestedCardHistoryData?.data
                            // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">
                                  {row?.number}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.user.first_name +
                                    " " +
                                    row?.user.last_name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.system_id}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.reason}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.membership_card_type === null
                                    ? "N/A"
                                    : row?.membership_card_type.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.status === 0
                                    ? "Not Accepted Yet!"
                                    : "Accepted"}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.handled_by.first_name +
                                    " " +
                                    row?.handled_by.last_name}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">
                                {row?.disbursed_at === null
                                  ? "N/A"
                                  : row?.disbursed_at}
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
                <Fragment>
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

export default AllRequestedCardHistories;
