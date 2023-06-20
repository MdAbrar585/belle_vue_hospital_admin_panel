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
import {
  loadPartnerDetailsFunc,
  loadPartnerServiceDetailsFunc,
  uploadPartnerImageFunc,
} from "../../redux/actions/partnerAction";
import addFile from "../../assets/icons/add-image.png";
import {
  CLEAR_ERRORS,
  UPLOAD_PARTNER_IMAGE_RESET,
} from "../../redux/constants/partnerConstant";
import { loadNewsDetailsFunc } from "../../redux/actions/newsAction";
import NewLoader from "../loader/NewLoader";

const PartnerServiceListDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { partnerServiceListId } = useParams();
  console.log(
    "/partnermanagement/partnerservicelistdetails/",
    partnerServiceListId
  );
  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  let [impoertFileData, setImpoertFileData] = useState("");

  const { partnerDetailsLoading, partnerDetailsData, partnerDetailsError } =
    useSelector((state) => state.loadPartnerDetails);

  const {
    partnerServiceDetailsData,
    partnerServiceDetailsLoading,
    partnerServiceDetailsError,
  } = useSelector((state) => state.loadPartnerServiceDetails);

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

    // dispatch(uploadPartnerImageFunc(token?.access_token, myForm, newsId));
  };

  useEffect(() => {
    setDefaultLoader(true);

    // if (uploadPartnerImageError) {
    //   alert.error(uploadPartnerImageError.message);
    //   // setState({ right: false });
    //   dispatch({ type: CLEAR_ERRORS });
    // }

    // if (uploadPartnerImageSuccess) {
    //   alert.success("Partner Image Upload Successfully!");
    //   // setState({ right: false });
    //   console.log("success", uploadPartnerImageSuccess);
    //   dispatch({ type: UPLOAD_PARTNER_IMAGE_RESET });
    //   dispatch(loadPartnerServiceDetailsFunc(token?.access_token, newsId));
    // }
    if (token != null) {
      dispatch(
        loadPartnerServiceDetailsFunc(token?.access_token, partnerServiceListId)
      );
    }
  }, [dispatch, token, partnerServiceListId, alert]);

  return (
    <>
      {!defaultLoader ? (
        <Loader />
      ) : (
        <>
          {partnerServiceDetailsLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />
              {/* <div className="m-4">
                <h1>Details</h1>

                <div>
                  <div className="text-center">
                    <>
                      <img
                        style={{
                          border: "1px solid",
                          padding: "10px",
                          margin: "20px",
                          width: "300px",
                          height: "300px",
                        }}
                        src={partnerServiceDetailsData?.data.image}
                        // src={user}
                        alt=""
                      />
                    </>
                  </div>
                  <div style={{ marginTop: "20px" }} className="row w-100">
                    <div className="col-md-12">
                      <h4>
                        Partner Name :{" "}
                        {partnerServiceDetailsData?.data.partner.partner_name}
                      </h4>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="m-4">
                <>
                  <div className="container py-5">
                    {/* <div className="row">
                <div className="col">
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
                  </div>
                </div> */}
                    <h1 className="mb-5">Partner Service Details</h1>

                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card mb-4">
                          <div className="card-body text-center">
                            {partnerServiceDetailsData?.data.image !==
                            undefined ? (
                              <img
                                src={partnerServiceDetailsData?.data.image}
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
                            {/* <div className="customer-btn-div col-md-12">
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
                            </div> */}
                            <h5 className="my-3">
                              {
                                partnerServiceDetailsData?.data.partner
                                  .partner_name
                              }
                            </h5>
                            <p className="text-muted mb-1">
                              Value : {partnerServiceDetailsData?.data.value}
                              {/* ppp */}
                            </p>
                            <p className="text-muted mb-1">
                              Discount :{" "}
                              {partnerServiceDetailsData?.data.discount}
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
                                    partnerServiceDetailsData?.data.partner
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
                                  {
                                    partnerServiceDetailsData?.data.partner
                                      .email
                                  }
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
                                  {
                                    partnerServiceDetailsData?.data.partner
                                      .phone
                                  }
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
                                  {partnerServiceDetailsData?.data.partner.nid}
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
                                    partnerServiceDetailsData?.data.partner
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
                                    partnerServiceDetailsData?.data.partner
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

export default PartnerServiceListDetails;
