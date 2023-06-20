import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
// import user from "../../assets/icons/man.png";
import {
  loadPartnerDetailsFunc,
  uploadPartnerImageFunc,
} from "../../redux/actions/partnerAction";
import addFile from "../../assets/icons/add-image.png";
import {
  CLEAR_ERRORS,
  UPLOAD_PARTNER_IMAGE_RESET,
} from "../../redux/constants/partnerConstant";
import NewLoader from "../loader/NewLoader";

const PartnerListDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { partnerId } = useParams();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const { partnerDetailsLoading, partnerDetailsData } = useSelector(
    (state) => state.loadPartnerDetails
  );

  const { uploadPartnerImageSuccess, uploadPartnerImageError } = useSelector(
    (state) => state.uploadPartnerImage
  );

  // console.log("--->",partnerDetailsData?.data.attributes, partnerId);
  // const searchObject = loadCustomerData?.data?.find(
  //   (customer) => customer.id === parseInt(partnerId)
  // );
  // console.log(searchObject);

  //   console.log();

  const handleImportClick = (data) => {
    console.log("click", data);

    const myForm = new FormData();
    myForm.set("image", data);

    dispatch(uploadPartnerImageFunc(token?.access_token, myForm, partnerId));
  };

  useEffect(() => {
    setDefaultLoader(true);

    if (uploadPartnerImageError) {
      alert.error(uploadPartnerImageError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (uploadPartnerImageSuccess) {
      alert.success("Partner Image Upload Successfully!");
      // setState({ right: false });
      console.log("success", uploadPartnerImageSuccess);
      dispatch({ type: UPLOAD_PARTNER_IMAGE_RESET });
      dispatch(loadPartnerDetailsFunc(token?.access_token, partnerId));
    }
    if (token != null) {
      dispatch(loadPartnerDetailsFunc(token?.access_token, partnerId));
    }
  }, [
    dispatch,
    token,
    partnerId,
    uploadPartnerImageError,
    uploadPartnerImageSuccess,
    alert,
  ]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {partnerDetailsLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />
              <div className="m-4">
                <>
                  <div className="container py-5">
                    <h1>Partner Details</h1>

                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card mb-4">
                          <div className="card-body text-center">
                            {partnerDetailsData?.data.attributes.image !==
                            undefined ? (
                              <img
                                src={partnerDetailsData?.data.attributes.image}
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
                            <div className="customer-btn-div col-md-12">
                              <label htmlFor="addfile">
                                <span
                                  style={{ fontWeight: "900" }}
                                  className="mr-2"
                                >
                                  Change Partner Picture
                                </span>
                                <img className="mr-3" src={addFile} alt="" />
                              </label>
                              <input
                                id="addfile"
                                type="file"
                                // className="mr-3"
                                // style={{ background: "#023047" }}
                                onChange={(e) =>
                                  handleImportClick(e.currentTarget.files[0])
                                }
                              />
                            </div>
                            <span style={{fontSize:"12px",color:"red"}}>
                              **Max Image Resolution : 1920 X 1080px
                              Max Image Size : 10MB
                            </span>
                            <h5 className="my-3">
                              {partnerDetailsData?.data.attributes.first_name +
                                " " +
                                partnerDetailsData?.data.attributes.last_name}
                            </h5>
                            <p className="text-muted mb-1">
                              {/* {userDetailsData?.data.user_type.name} */}
                              {/* ppp */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="card mb-4">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Partner Name</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {
                                    partnerDetailsData?.data.attributes
                                      .partner_name
                                  }
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
                                  {partnerDetailsData?.data.attributes.email}
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
                                  {partnerDetailsData?.data.attributes.phone}
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
                                  {partnerDetailsData?.data.attributes.nid}
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Validity Days</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {
                                    partnerDetailsData?.data.attributes
                                      .valid_days
                                  }
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Activated At</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {
                                    partnerDetailsData?.data.attributes
                                      .activated_at
                                  }
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
          )}
        </>
      )}
    </>
  );
};

export default PartnerListDetails;
