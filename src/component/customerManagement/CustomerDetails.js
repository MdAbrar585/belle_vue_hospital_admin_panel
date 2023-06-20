import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCustomerDetailsFunc } from "../../redux/actions/customerAction";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
// import user from "../../assets/icons/man.png";
import NewLoader from "../loader/NewLoader";

const CustomerDetails = () => {
  // const alert = useAlert();

  const dispatch = useDispatch();

  const { customerId } = useParams();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const { customerDetailsData } = useSelector(
    (state) => state.loadCustomerDetails
  );

  // console.log("--->",customerDetailsData?.data.attributes, customerId);
  // const searchObject = loadCustomerData?.data?.find(
  //   (customer) => customer.id === parseInt(customerId)
  // );
  console.log(
    "customerDetailsData?.data?.attributes?.last_name",
    customerDetailsData?.data?.attributes?.last_name === null
  );

  useEffect(() => {
    setDefaultLoader(true);

    if (token != null) {
      dispatch(loadCustomerDetailsFunc(token?.access_token, customerId));
    }
  }, [dispatch, token, customerId]);
  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          <Sidebar>
            <Navbar />

            <div className="m-4">
              <>
                <div className="container py-5">
                  <h1 className="mb-5">Customer Details</h1>

                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card mb-4">
                        <div className="card-body text-center">
                          {customerDetailsData?.data?.attributes?.image !==
                          undefined ? (
                            <img
                              src={customerDetailsData?.data?.attributes?.image}
                              alt="avatar"
                              className="rounded-circle img-fluid"
                              style={{
                                border: "1px solid",
                                padding: "10px",
                                margin: "20px",
                                width: "150px",
                                height: "150px",
                              }}
                            />
                          ) : (
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                              alt="avatar"
                              className="rounded-circle img-fluid"
                              style={{ width: "150px" }}
                            />
                          )}

                          <h5 className="my-3">
                            {customerDetailsData?.data.attributes.first_name}
                          </h5>
                          <b>
                            {customerDetailsData?.data?.attributes?.profession}
                          </b>
                          <p className="text-muted mb-1">
                            User Id :{" "}
                            {customerDetailsData?.data?.attributes?.system_id}
                          </p>
                          <p className="text-muted mb-1">
                            Date Of Birth :{" "}
                            {
                              customerDetailsData?.data?.attributes
                                ?.date_of_birth
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card mb-4">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0">Customer Name</p>
                            </div>
                            <div className="col-sm-9 d-flex">
                              <p className="text-muted mb-0">
                                {
                                  customerDetailsData?.data.attributes
                                    .first_name
                                }
                              </p>{" "}
                              &nbsp;&nbsp;
                              <p className="text-muted mb-0">
                                {customerDetailsData?.data.attributes
                                  .last_name === null
                                  ? " "
                                  : customerDetailsData?.data.attributes
                                      .last_name}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0">Email</p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-muted mb-0">
                                {customerDetailsData?.data?.attributes?.email}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0">Phone</p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-muted mb-0">
                                {customerDetailsData?.data?.attributes?.phone}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0">NID No. </p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-muted mb-0">
                                {customerDetailsData?.data?.attributes?.nid}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0">Location</p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-muted mb-0">
                                {
                                  customerDetailsData?.data?.attributes
                                    ?.location
                                }
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0">Address</p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-muted mb-0">
                                {customerDetailsData?.data?.attributes?.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </Sidebar>
        </>
      )}
    </>
  );
};

export default CustomerDetails;
