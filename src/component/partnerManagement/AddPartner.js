import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/partner.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import {
  createUser,
  loadInternalUserData,
  loadUserType,
} from "../../redux/actions/userAction";
// import { useAlert } from "react-alert";
import { CREATE_USER_RESET } from "../../redux/constants/userConstant";
import { createPartner, loadPartnerData, loadPartnerTypeFunc } from "../../redux/actions/partnerAction";
import { CLEAR_ERRORS, CREATE_PARTNER_RESET } from "../../redux/constants/partnerConstant";

const AddPartner = ({ setState }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

 

  // form validation rules
  const validationSchema = Yup.object().shape({
    
    partnerName: Yup.string().required("Partner Name is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    // address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .min(11, "Mobile Number must be at least 11 characters")
      .max(11, "Mobile Number must be at least 11 characters")
      .required("Mobile Number is required"),
    activatedAt: Yup.string()
      .required("Activation Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Activation Date must be a valid date in the format YYYY-MM-DD"
    ),
    expiredAt: Yup.string()
      .required("Expired Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Expired Date must be a valid date in the format YYYY-MM-DD"
      ),
    nidNo: Yup.string()
      .required("NID is required")
      .matches(
        /(^(\d{10}|\d{13}|\d{17})?$)/,
        "NID must be 10,13 or 17 Character"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    partnerType: Yup.string().required("User Tyoe is required"),

    // password: Yup.string()
    //   .min(6, "Password must be at least 6 characters")
    //   .required("Password is required"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm Password is required"),
    // acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();
    
    myForm.set("partner_name", data.partnerName);
    myForm.set("first_name", data.firstName);
    myForm.set("last_name", data.lastName);
    myForm.set("email", data.email);
    myForm.set("phone", data.phone);
    myForm.set("nid", data.nidNo);
    myForm.set("user_type_id", data.partnerType);
    myForm.set("activated_at", data.activatedAt);
    myForm.set("expired_at", data.expiredAt);

    dispatch(createPartner(token.access_token, myForm));
  };

  const { createdPartnerError,createdPartnerSuccess, createdPartnerLoading, createdPartner } = useSelector(
    (state) => state.createPartners
  );

  const { partnerTypeData } = useSelector(
    (state) => state.loadPartnerType
  );

  useEffect(() => {
    if (createdPartnerError) {
      alert.error(createdPartnerError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (createdPartnerSuccess) {
      alert.success("Partner Created Successfully!");
      setState({ right: false });
      console.log("success", createdPartnerSuccess);
      dispatch({ type: CREATE_PARTNER_RESET });
      dispatch(loadPartnerData(token?.access_token));
    }
    dispatch(loadPartnerTypeFunc(token?.access_token));

  }, [dispatch, token, createdPartnerSuccess, createdPartnerError, alert, setState]);
  return (
    <div className="drawer-width-container m-4">
      <h1>Add Partner</h1>
      <div className="d-flex justify-content-center">
        <img style={{width:"50%"}} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Partner Name</label>
            <input
              className={`form-control ${errors.partnerName ? "is-invalid" : ""}`}
              {...register("partnerName", { required: true })}
              placeholder="Partner Name"
            />
            <span className="invalid-feedback text-danger">
              {errors.partnerName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>First Name</label>
            <input
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName", { required: true })}
              placeholder="First Name"
            />
            <span className="invalid-feedback text-danger">
              {errors.firstName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Last Name</label>
            <input
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              {...register("lastName", { required: true })}
              placeholder="Last Name"
            />
            <span className="text-danger invalid-feedback">
              {errors.lastName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: true })}
              placeholder="Email"
              autoSave="false"
            />
            <span className="text-danger">{errors.email?.message}</span>
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
                placeholder="Phone No"
              />
            </div>
            <span className="text-danger">{errors.phone?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>Activation</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="activatedAt"
              type="date"
              {...register("activatedAt")}
              className={`form-control ${errors.activatedAt ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.activatedAt?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>Expiration</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="expiredAt"
              type="date"
              {...register("expiredAt")}
              className={`form-control ${errors.expiredAt ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.expiredAt?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>NID</label>
            <input
              className={`form-control ${errors.nidNo ? "is-invalid" : ""}`}
              {...register("nidNo", { required: true })}
              placeholder="NID"
            />
            <span className="text-danger">{errors.nidNo?.message}</span>
          </div>

          {/* <div className="form-group col-md-6">
            <label>User Type</label>
            <input
              className={`form-control ${errors.partnerType ? "is-invalid" : ""}`}
              {...register("partnerType", { required: true })}
              placeholder="User Type"
            />
            <span className="text-danger">{errors.partnerType?.message}</span>
          </div> */}

          <div className="form-group col-md-6">
            <label>Partner Type</label>
            <select
                className="form-control"
                {...register("partnerType", { required: true })}
              >
                <option value="">Select Partner Type</option>
                {partnerTypeData?.data &&
                  partnerTypeData?.data.map((catData) => (
                    <option value={catData.id}>{catData.name}</option>
                  ))}
              </select>
            <span className="text-danger">
              {errors.partnerType?.type === "required" && "Partner Type is required"}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <input
            className="add-user-button"
            type="submit"
            value="Create Partner"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPartner;
