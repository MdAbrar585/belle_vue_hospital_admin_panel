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
import { loadDisbursedCardListData } from "../../redux/actions/cardManagementAction";
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

const DisbursedCardList = () => {
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

  // const disbursedCardData = {
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

  const { disbursedCardLoading, disbursedCardData } =
    useSelector((state) => state.loadDisbursedCards);
  const [pages, setPages] = useState(
    disbursedCardData?.page === undefined ? 1 : disbursedCardData?.page
  );
  //   console.log(disbursedCardData);

  useEffect(() => {
    setDefaultLoader(true);

    if (token != null) {
      dispatch(loadDisbursedCardListData(token?.access_token));
    }
  }, [dispatch, token]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {disbursedCardLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Disbursed Card List</h1>
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
                      count={disbursedCardData?.totalPage}
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
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>

                    {disbursedCardData?.data.length > 0 ? (
                      <TableBody>
                        {disbursedCardData &&
                          disbursedCardData?.data
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
                                  {row?.status === 1 ? (
                                    <span>Disbursed</span>
                                  ) : (
                                    <span>Not Disbursed</span>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row?.disbursed_at === null
                                    ? "N/A"
                                    : row?.disbursed_at}
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

export default DisbursedCardList;
