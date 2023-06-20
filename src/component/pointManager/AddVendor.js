import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/partner.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";
import { CLEAR_ERRORS, CREATE_VENDOR_RESET } from "../../redux/constants/pointManagerConstant";
import { createVendorFunc, loadVendorListDataFunc, loadVendorTypeDataFunc } from "../../redux/actions/pointManagerAction";

const AddVendor = ({ setState }) => {
    const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    // address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .min(11, "Mobile Number must be at least 11 characters")
      .max(11, "Mobile Number must be at least 11 characters")
      .required("Mobile Number is required"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    nidNo: Yup.string()
      .required("NID is required")
      .matches(
        /(^(\d{10}|\d{13}|\d{17})?$)/,
        "NID must be 10,13 or 17 Character"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    ventureType: Yup.string().required("Venture Tyoe is required"),

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
    
    
    myForm.set("first_name", data.firstName);
    myForm.set("last_name", data.lastName);
    myForm.set("email", data.email);
    myForm.set("phone", data.phone);
    myForm.set("nid", data.nidNo);
    myForm.set("user_type_id", data.ventureType);
    myForm.set("date_of_birth", data.dob);
    // alert.error("Under Development");

    dispatch(createVendorFunc(token.access_token, myForm));
  };

  const { createdVendorError,createdVendorSuccess, createdVendorLoading, createdVendor } = useSelector(
    (state) => state.createVendor
  );

  const { vendorTypeData } = useSelector(
    (state) => state.loadVendorType
  );

  useEffect(() => {
    if (createdVendorError) {
      alert.error(createdVendorError.message);
      setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (createdVendorSuccess) {
      alert.success("Venture Created Successfully!");
      setState({ right: false });
      console.log("success", createdVendorSuccess);
      dispatch({ type: CREATE_VENDOR_RESET });
      dispatch(loadVendorListDataFunc(token?.access_token));
    }
    dispatch(loadVendorTypeDataFunc(token?.access_token));

  }, [dispatch, token, createdVendorSuccess, createdVendorError, alert, setState]);
  return (
    <div className="drawer-width-container m-4">
      <h1>Add Venture</h1>
      <div className="d-flex justify-content-center">
        <img style={{width:"50%"}} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* <div className="form-group col-md-12">
            <label>Venture Name</label>
            <input
              className={`form-control ${errors.partnerName ? "is-invalid" : ""}`}
              {...register("partnerName", { required: true })}
              placeholder="Venture Name"
            />
            <span className="invalid-feedback text-danger">
              {errors.partnerName?.message}
            </span>
          </div> */}

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
            <label>Date of Birth</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="dob"
              type="date"
              {...register("dob")}
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.dob?.message}</span>
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

          <div className="form-group col-md-6">
            <label>Venture Type</label>
            <select
                className="form-control"
                {...register("ventureType", { required: true })}
              >
                <option value="">Select Venture Type</option>
                {vendorTypeData?.data &&
                  vendorTypeData?.data.map((catData) => (
                    <option value={catData.id}>{catData.name}</option>
                  ))}
              </select>
            <span className="text-danger">
              {errors.ventureType?.type === "required" && "Venture Type is required"}
            </span>
          </div>
        </div>
        <div className="col-md-12">
          <input
            className="add-user-button"
            type="submit"
            value="Create Venture"
          />
        </div>
      </form>
    </div>
  );
};

export default AddVendor;