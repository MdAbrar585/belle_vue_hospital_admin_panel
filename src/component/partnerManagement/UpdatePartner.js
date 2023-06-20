import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/partner.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import {
  loadUserType,
} from "../../redux/actions/userAction";
// import { useAlert } from "react-alert";
import {
  loadPartnerData,
  loadPartnerTypeFunc,
  updatePartner,
} from "../../redux/actions/partnerAction";
import {
  CLEAR_ERRORS,
  UPDATE_PARTNER_RESET,
} from "../../redux/constants/partnerConstant";

const UpdatePartner = ({
  setState,
  partnerId,
  setStateUpdate,
  partnerData,
}) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const searchObject = partnerData?.data?.find(
    (customer) => customer.id === parseInt(partnerId)
  );

  console.log("partner  ========>>>", searchObject);

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
    partnerType: Yup.string().required("Partner Type is required"),

    // password: Yup.string()
    //   .min(6, "Password must be at least 6 characters")
    //   .required("Password is required"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm Password is required"),
    // acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
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
    // myForm.set("user_type_id", data.partnerType);
    myForm.set("activated_at", data.activatedAt);
    myForm.set("expired_at", data.expiredAt);

    dispatch(updatePartner(token.access_token, myForm,partnerId));
  };

  const {
    updatedPartnerError,
    updatedPartnerSuccess,
  } = useSelector((state) => state.updatePartners);


  const { partnerTypeData } = useSelector(
    (state) => state.loadPartnerType
  );

  useEffect(() => {
    if (updatedPartnerError) {
      alert.error(updatedPartnerError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedPartnerSuccess) {
      alert.success("Partner Updated Successfully!");
      setStateUpdate({ right: false });
      console.log("success", updatedPartnerSuccess);
      dispatch({ type: UPDATE_PARTNER_RESET });
      dispatch(loadPartnerData(token?.access_token));
    }
    dispatch(loadUserType(token?.access_token));
    dispatch(loadPartnerTypeFunc(token?.access_token));

  }, [
    dispatch,
    token,
    updatedPartnerSuccess,
    updatedPartnerError,
    alert,
    setStateUpdate,
  ]);
  return (
    <div className="drawer-width-container m-4">
      <h1>Update Partner</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Partner Name</label>
            <input
              className={`form-control ${
                errors.partnerName ? "is-invalid" : ""
              }`}
              {...register("partnerName", { required: true })}
              placeholder="Partner Name"
              defaultValue={searchObject?.attributes.partner_name}
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
              defaultValue={searchObject?.attributes.first_name}
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
              defaultValue={searchObject?.attributes.last_name}
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
              defaultValue={searchObject?.attributes.email}
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
                defaultValue={searchObject?.attributes.phone}
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
              className={`form-control ${
                errors.activatedAt ? "is-invalid" : ""
              }`}
              defaultValue={searchObject?.attributes.activated_at}
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
              defaultValue={searchObject?.attributes.expired_at}
            />
            <span className="text-danger">{errors.expiredAt?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>NID</label>
            <input
              className={`form-control ${errors.nidNo ? "is-invalid" : ""}`}
              {...register("nidNo", { required: true })}
              placeholder="NID"
              defaultValue={searchObject?.attributes.nid}
            />
            <span className="text-danger">{errors.nidNo?.message}</span>
          </div>

          {/* <div className="form-group col-md-6">
            <label>User Type</label>
            <input
              className={`form-control ${errors.userType ? "is-invalid" : ""}`}
              {...register("userType", { required: true })}
              placeholder="User Type"
            />
            <span className="text-danger">{errors.userType?.message}</span>
          </div> */}

          <div className="form-group col-md-6">
            <label>Partner Type</label>
            <select
              className="form-control"
              {...register("partnerType", { required: true })}
              value={searchObject?.user_type.id}
            >
              <option value="">Select Partner Type</option>
              {partnerTypeData?.data &&
                partnerTypeData?.data.map((catData) => (
                  <option value={catData.id}>{catData.name}</option>
                ))}
            </select>
            <span className="text-danger">
              {errors.partnerType?.type === "required" && "User Type is required"}
            </span>
          </div>
        </div>
        <div className="col-md-12">
          <input
            className="add-user-button"
            type="submit"
            value="Update Partner"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePartner;
