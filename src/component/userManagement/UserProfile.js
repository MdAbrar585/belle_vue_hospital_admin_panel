import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadUserDetailsFunc } from "../../redux/actions/userAction";
import NewLoader from "../loader/NewLoader";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const UserProfile = () => {
  const { userProfileId } = useParams();


  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const { userDetailsData, userDetailsLoading } = useSelector(
    (state) => state.loadUserDetails
  );

  console.log("userDetailsData", userDetailsData);

  useEffect(() => {
    setDefaultLoader(true);
    // console.log("1",isCustomerDeleted);

    // if (isCustomerDeleted) {
    //   console.log(isCustomerDeleted);
    //   alert.error("Customer Deleted Successfully!");

    //   dispatch({ type: DELETE_CUSTOMER_RESET });
    //   // dispatch(loadCustomer(token?.access_token));
    // }

    dispatch(loadUserDetailsFunc(token?.access_token, userProfileId));
  }, [dispatch, token, userProfileId]);

  return (
    <>
      {userDetailsLoading ? (
        <NewLoader />
      ) : (
        <Fragment>
          {!defaultLoader ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="container py-5">
                <div className="row">
                  {/* <div className="col">
                    <nav
                      aria-label="breadcrumb"
                      className="bg-light rounded-3 p-3 mb-4"
                    >
                      <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                          <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">User</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                          User Profile
                        </li>
                      </ol>
                    </nav>
                  </div> */}
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "150px" }}
                        />
                        <h5 className="my-3">
                          {userDetailsData?.data.attributes.first_name +
                            " " +
                            userDetailsData?.data.attributes.last_name}
                        </h5>
                        <p className="text-muted mb-1">
                          {userDetailsData?.data.user_type.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Full Name</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {userDetailsData?.data.attributes.first_name +
                                " " +
                                userDetailsData?.data.attributes.last_name}
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
                              {userDetailsData?.data.attributes.email}
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
                              {userDetailsData?.data.attributes.phone}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Date of Birth</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {userDetailsData?.data.attributes.date_of_birth}
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
                              Bay Area, San Francisco, CA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Sidebar>
          )}
        </Fragment>
      )}
    </>
  );
};

export default UserProfile;
