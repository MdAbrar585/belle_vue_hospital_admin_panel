import React, { useEffect } from "react";
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
import { useAlert } from "react-alert";
import { useState } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@mui/material";
import { loadReportFunc } from "../../redux/actions/reportAction";
import Loader from "../loader/Loader";
import downloadIcon from "../../assets/icons/download.png";
import NewLoader from "../loader/NewLoader";
import moment from "moment";

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

const ReportList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [pages, setPages] = useState(1);

  let [defaultLoader, setDefaultLoader] = useState(false);

  const theme = useTheme();

  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { reportData, reportLoading, reportError } = useSelector(
    (state) => state.loadReport
  );

  const handleDownload = (data) => {
    console.log("click", data);
    window.location.href = data;
  };

  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  useEffect(() => {
    setDefaultLoader(true);

    // if (isNewsDeleted) {
    //   alert.error("News Deleted Successfully!");

    //   dispatch({ type: DELETE_NEWS_RESET });
    //   // dispatch(loadCustomer(token?.access_token));
    // }

    // if (approveCustomerSuccess) {
    //   // alert.success("Student Added Successfully");
    //   // navigate("/course");
    //   setState({ right: false });
    //   // dispatch(loadCourseData(token.accessToken, 1));
    //   console.log("success", approveCustomerSuccess);
    //   dispatch({ type: APPROVE_CUSTOMER_RESET });
    //   // dispatch(loadCustomer(token?.access_token));
    // }

    const myForm = new FormData();
    // myForm.set("is_active", 1);
    myForm.set("per_page", 10);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadReportFunc(token?.access_token, myForm));
    }
  }, [dispatch, token, pages]);
  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {reportLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="m-4">
                  <div className="d-flex justify-content-between">
                    <h1>Report List</h1>

                    {/* <div className="customer-btn-div">
              <Button
                style={{ background: "#023047" }}
                // onClick={() => handleClick("right", true)}
                variant="contained"
              >
                Add News
              </Button>
            </div> */}
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
                        count={reportData?.meta?.last_page}
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
                            Report Title
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            Report Type
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            Generated By
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            Generated At
                          </StyledTableCell>

                          {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                          <StyledTableCell align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      {reportData?.data.length > 0 ? (
                        <TableBody>
                          {reportData &&
                            reportData?.data
                              // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell width="100px" align="center">
                                    {row.name}
                                  </StyledTableCell>

                                  <StyledTableCell width="100px" align="center">
                                    {row.type}
                                  </StyledTableCell>
                                  <StyledTableCell width="100px" align="center">
                                    {row.generated_by === null
                                      ? "N/A"
                                      : row.generated_by.first_name +
                                        " " +
                                        row.generated_by.last_name}
                                  </StyledTableCell>
                                  <StyledTableCell width="100px" align="center">
                                    {/* {row.created_at} */}
                                    {moment(row.created_at).format(
                                      "YYYY-MM-DD , h:mm:ss a"
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell width="100px" align="center">
                                    <img
                                      className="ml-2"
                                      src={downloadIcon}
                                      onClick={() =>
                                        handleDownload(row.location)
                                      }
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
              </div>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default ReportList;
