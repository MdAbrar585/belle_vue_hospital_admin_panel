import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from "react";
import "./PartnerManagement.css";
import PartnerServiceList from "./PartnerServiceList";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AddUser from "../userManagement/AddUser";
import { Fragment } from "react";
import PartnerUserDetails from "./PartnerUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loadCustomer } from "../../redux/actions/customerAction";
import ServiceRPServiceList from "./ServiceRPServiceList";

const ServiceRedemptionPanel = () => {
  const dispatch = useDispatch();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const [userPhoneNo, setUserPhoneNo] = useState("");

  const [OTP, setOTP] = useState("");

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [showOtp, setShowOtp] = useState(false);

  const [showServiceList, setShowServiceList] = useState(false);

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .min(11, "Mobile Number must be at least 11 characters")
      .max(11, "Mobile Number must be at least 11 characters")
      .required("Mobile Number is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // const myForm = new FormData();

    // myForm.set("partner_name", data.partnerName);
  };

  const handlePhoneNo = (data) => {
    setUserPhoneNo(data);
    console.log("data", data, data.length);
    if (data.length === 11) {
      console.log("Succes 11");
      setShowOtp(true);
      setShowServiceList(false);
    } else {
      setShowOtp(false);
      setShowServiceList(false);
    }
    // const myForm = new FormData();

    // myForm.set("partner_name", data.partnerName);
  };

  console.log(OTP);
  // if (OTP.length === 6) {
  //   setShowServiceList(true);
  // }

  const { loadCustomerLoading, loadCustomerData, loadCustomerError } =
    useSelector((state) => state.loadCustomer);

  console.log(loadCustomerData);

  useEffect(() => {
    if (OTP.length === 6) {
      setShowServiceList(true);
      setState({ ...state, ["right"]: true });

      console.log("Check Phone No", userPhoneNo);
    } else {
      setShowServiceList(false);
    }

    const myForm = new FormData();
    myForm.set("filter", userPhoneNo);
    myForm.set("is_active", 1);

    if (token != null) {
      dispatch(loadCustomer(token?.access_token, myForm));
    }
  }, [OTP, userPhoneNo, dispatch, token]);

  return (
    <Sidebar>
      <Navbar></Navbar>
      <div className="m-4">
        <h1>Service Redemption Panel</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group col-md-4">
              <label>Mobile Number</label>

              <div className="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    +88
                  </span>
                </div>
                <input
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  {...register("phone", { required: true })}
                  placeholder="Phone No"
                  onChange={(e) => handlePhoneNo(e.target.value)}
                />
              </div>
              <span className="text-danger">{errors.phone?.message}</span>
            </div>
          </div>

          <div></div>
          {/* <div className="">
            <input className="custom-button" type="submit" value="Send Otp" />
          </div> */}
        </form>

        {showOtp && (
          <div className="mt-4 w-25">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure
            />
            <div className="mt-3 resend-btn">
              <ResendOTP
                onResendClick={() => {
                  setOTP("");
                  setShowServiceList(false);
                  console.log("resend");
                }}
              />
            </div>
          </div>
        )}

        {showServiceList && (
          <div>
            <h1 className="mt-2">Service List</h1>
            <ServiceRPServiceList />
          </div>
        )}

        {/* <div className="d-flex justify-content-between">
          <h1>User List</h1>
          <Button
            style={{ background: "#023047" }}
            onClick={() => handleClick("right", true)}
            variant="contained"
          >
            Add User
          </Button>
        </div> */}

        <Fragment>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            <PartnerUserDetails
              setShowOtp={setShowOtp}
              state={state}
              setState={setState}
              loadCustomerData={loadCustomerData}
              userPhoneNo={userPhoneNo}
            />
          </Drawer>
        </Fragment>
      </div>
    </Sidebar>
  );
};

export default ServiceRedemptionPanel;
