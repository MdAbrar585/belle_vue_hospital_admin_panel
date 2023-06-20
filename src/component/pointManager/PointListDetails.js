import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadCustomer,
  loadCustomerDetailsFunc,
} from "../../redux/actions/customerAction";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import user from "../../assets/icons/man.png";
import Loader from "../loader/Loader";
import { loadPointHistoryDetailsFunc } from "../../redux/actions/pointManagerAction";

const PointListDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { userId } = useParams();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const { pointHistoryDetailsLoading, pointHistoryDetailsData, pointHistoryDetailsError } =
    useSelector((state) => state.loadPointHistoryDetails);

  // console.log("--->",pointHistoryDetailsData?.data[0].trx_info, customerId);
  // const searchObject = loadCustomerData?.data?.find(
  //   (customer) => customer.id === parseInt(customerId)
  // );
  // console.log(searchObject);

  useEffect(() => {
    setDefaultLoader(true);

    if (token != null) {
      dispatch(loadPointHistoryDetailsFunc(token?.access_token, userId));
    }
  }, [dispatch, token, userId]);

  return (
    <Sidebar>
      <Navbar />
      <div className="m-4">
        <h1>PointList Details</h1>
        { !defaultLoader ? <Loader /> :
          <>
        <div className="d-flex">
          {/* <div>
            <img
              style={{ border: "1px solid", padding: "10px", margin: "20px" }}
              src={user}
              alt=""
            />
          </div> */}
          <div style={{ marginTop: "20px" }} className="row w-100">
            <div className="col-md-12">
              <h4>Transection Id : {pointHistoryDetailsData?.data[0].trx_info.trx_id}</h4>
            </div>

            <div className="col-md-6">
              <h4>Purchase Amount : {pointHistoryDetailsData?.data[0].trx_info.purchase_amount}</h4>
            </div>
            <div className="col-md-6">
              <h4>Points Credited : {pointHistoryDetailsData?.data[0].trx_info.points_credited}</h4>
            </div>

            <div className="col-md-6">
            <h4>Points Debited : {pointHistoryDetailsData?.data[0].trx_info.points_debited}</h4>

            </div>
            <div className="col-md-6">
              <h4>Venture Name : {pointHistoryDetailsData?.data[0].venture_name}</h4>
            </div>

            {pointHistoryDetailsData?.data[0].trx_info.nid !== null ? (
              <div className="col-md-6">
                <h4>Venture Branch : {pointHistoryDetailsData?.data[0].venture_branch}</h4>
              </div>
            ) : (
              <></>
            )}

            
          </div>
        </div>

        
        </>}
      </div>
    </Sidebar>
  );
};

export default PointListDetails;
