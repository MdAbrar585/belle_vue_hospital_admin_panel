import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loadCustomer } from "../../redux/actions/customerAction";
import * as Yup from "yup";
import Loader from "../loader/Loader";
import userImg from "../../assets/icons/man.png";

const PartnerUserDetails = ({
  userPhoneNo,
  loadCustomerData,
  setState,
  state,
  setShowOtp,
}) => {
  console.log("user userPhoneNo", userPhoneNo);

  const dispatch = useDispatch();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card Number is required"),
    // name: Yup.string().required("Name is required"),
    // address: Yup.string().required("Address is required"),
    phone: Yup.string()
      // .min(11, "Mobile Number must be at least 11 characters")
      // .max(11, "Mobile Number must be at least 11 characters")
      .required("Mobile Number is required"),
    // email: Yup.string().required("Email is required").email("Email is invalid"),
    // customerType: Yup.string().required("Customer Tyoe is required"),
    // profession: Yup.string().required("Profession is required"),
    cardType: Yup.string().required("Card Tyoe is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  //   const onSubmit = (data) => {
  //     console.log(data);
  //     // console.log(moment(startDate).format("YYYY-MM-DD"));
  //     const myForm = new FormData();

  //     myForm.set("number", data.cardNumber);
  //     myForm.set("membership_card_type_id", data.cardType);
  //     myForm.set("phone", data.phone);

  //     // dispatch(allocateCard(token.access_token, myForm));
  //   };

  const handleConfirm = () => {
    console.log("click");
    setState({ ...state, ["right"]: false });
    setShowOtp(false);
  };
  useEffect(() => {
    setDefaultLoader(true);

    const myForm = new FormData();
    myForm.set("filter", userPhoneNo);
    myForm.set("is_active", 1);

    if (token != null) {
      dispatch(loadCustomer(token?.access_token, myForm));
    }
  }, [dispatch, token, userPhoneNo]);
  return (
    <div className="m-4">
      <h1>User Details</h1>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center mt-5 mb-5">
          <img style={{ width: "30%" }} src={userImg} alt="" />
        </div>

        {/* <div className="form-group col-md-6">
            <label>Card Number</label>
            <input
              className={`form-control ${
                errors.cardNumber ? "is-invalid" : ""
              }`}
              {...register("cardNumber", { required: true })}
              placeholder="Card Number"
            />
            <span className="invalid-feedback text-danger">
              {errors.cardNumber?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
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
                placeholder="Mobile Number"
                onBlur={(e) => {
                  //   handleMobileNumber(e);
                }}
              />
            </div>
            <span className="text-danger">{errors.phone?.message}</span>
          </div> */}

        <>
          <div className="form-group col-md-6">
            <label>User Id</label>
            <input
              className={`form-control ${errors.userId ? "is-invalid" : ""}`}
              // {...register("userId", { required: true })}
              placeholder="User Id"
              defaultValue="A-00002"
              readOnly={true}
            />
            <span className="text-danger invalid-feedback">
              {errors.userId?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Name</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              // {...register("name", { required: true })}
              placeholder="Name"
              defaultValue="Demo User"
              readOnly={true}
            />
            <span className="text-danger invalid-feedback">
              {errors.name?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Date Of Birth(YYYY-MM-DD)</label>
            <input
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
              // {...register("dob", { required: true })}
              placeholder="Date Of Birth"
              defaultValue="10/12/1990"
              readOnly={true}
            />
            <span className="text-danger invalid-feedback">
              {errors.dob?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              // {...register("email", { required: true })}
              placeholder="Email"
              defaultValue="demo@user.com"
              readOnly={true}
              autoSave="false"
            />
            <span className="text-danger">{errors.email?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>Profession</label>
            <input
              className={`form-control ${
                errors.designation ? "is-invalid" : ""
              }`}
              // {...register("profession", { required: true })}
              defaultValue="Businessman"
              readOnly={true}
              placeholder="Profession"
              autoSave="false"
            />
            <span className="text-danger">{errors.profession?.message}</span>
          </div>

          <>
            {!defaultLoader ? (
              <Loader />
            ) : (
              <div className="form-group col-md-6">
                <label>Customer Type</label>
                <input
                  className={`form-control ${
                    errors.customerType ? "is-invalid" : ""
                  }`}
                  // {...register("profession", { required: true })}
                  defaultValue="VIP"
                  readOnly={true}
                  placeholder="Customer Type"
                  autoSave="false"
                />
                <span className="text-danger">
                  {errors.customerType?.message}
                </span>
              </div>
            )}

            <div className="form-group col-md-12">
              <label>Address</label>
              <textarea
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                // {...register("dob", { required: true })}
                placeholder="Date Of Birth"
                defaultValue="Chittagong"
                readOnly={true}
              />
              <span className="text-danger invalid-feedback">
                {errors.dob?.message}
              </span>
            </div>
          </>
        </>

        {/* <div className="form-group col-md-6">
            <label>Card Type</label>

            <select
              className="form-control"
              {...register("cardType", { required: true })}
            >
              <option value="">Select Card Type</option>
              {loadCardTypeData?.data &&
                loadCardTypeData?.data.map((catData) => (
                  <option value={catData.id}>{catData.name}</option>
                ))}
            </select>
            <span className="text-danger">
              {errors.cardType?.type === "required" && "Project is required"}
            </span>
          </div> */}
      </div>
      <div className="w-100 d-flex justify-content-center">
        <input
          onClick={() => handleConfirm()}
          className="custom-button"
          type="submit"
          value="Confirm"
        />
      </div>
      {/* </form> */}
    </div>
  );
};

export default PartnerUserDetails;
