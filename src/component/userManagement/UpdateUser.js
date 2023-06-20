import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../assets/icons/view.png";
import addUserImg from "../../assets/logo/user.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  createUser,
  loadDesignation,
  loadInternalUserData,
  loadUserType,
  updateUsers,
} from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import {
  CLEAR_ERRORS,
  CREATE_USER_RESET,
  UPDATE_USER_RESET,
} from "../../redux/constants/userConstant";

const UpdateUser = ({
  setState,
  setPages,
  pages,
  userId,
  internalUserData,
  setStateUpdate,
}) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [btnLoader, setBtnLoader] = useState(false);

  const searchObject = internalUserData?.data?.find(
    (customer) => customer.id === parseInt(userId)
  );
  
  console.log("user  ========>>>", searchObject);

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
    userType: Yup.string().required("User Tyoe is required"),
    designation: Yup.string().required("Designation Tyoe is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    setBtnLoader(true);

    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("first_name", data.firstName);
    myForm.set("last_name", data.lastName);
    myForm.set("email", data.email);
    myForm.set("phone", data.phone);
    myForm.set("nid", data.nidNo);
    myForm.set("designation_id", data.designation);
    myForm.set("user_type_id", data.userType);
    myForm.set("date_of_birth", data.dob);

    dispatch(updateUsers(token.access_token, myForm, userId));
  };

  const {
    updatedUserSuccess,
    updatedUserLoading,
    updatedUserError,
    updatedUser,
  } = useSelector((state) => state.updateUsers);

  const { loadUserTypeData } = useSelector((state) => state.loadUserType);

  const { loadDesignationData } = useSelector((state) => state.loadDesignation);

  useEffect(() => {
    if (updatedUserError) {
      alert.error(updatedUserError.message);
      setBtnLoader(false);

      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedUserSuccess) {
      alert.success("User Updated Successfully!");
      setBtnLoader(false);

      setStateUpdate({ right: false });
      dispatch({ type: UPDATE_USER_RESET });

      const myForm = new FormData();

      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      dispatch(loadInternalUserData(token?.access_token));
    }
    dispatch(loadUserType(token?.access_token));
    dispatch(loadDesignation(token?.access_token));
  }, [
    dispatch,
    token,
    updatedUserSuccess,
    updatedUser,
    alert,
    setState,
    updatedUserError,
    pages,
    setStateUpdate,
  ]);
  return (
    <div className="drawer-width-container m-4">
      <h1>Update User</h1>
      <div className="w-100 d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addUserImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
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
              defaultValue={searchObject?.attributes.date_of_birth}
            />
            <span className="text-danger">{errors.dob?.message}</span>
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
            <label>Designation</label>
            <input
              className={`form-control ${
                errors.designation ? "is-invalid" : ""
              }`}
              {...register("designation", { required: true })}
              placeholder="Designation"
              autoSave="false"
            />
            <span className="text-danger">{errors.designation?.message}</span>
          </div> */}

          <div className="form-group col-md-6">
            <label>Designation</label>
            <select
              className="form-control"
              {...register("designation", { required: true })}
              value={searchObject?.designation === null ? 1 : searchObject?.designation.id}
            >
              <option value="">Select Designation</option>
              {loadDesignationData?.data &&
                loadDesignationData?.data.map((catData) => (
                  <option value={catData.id}>{catData.name}</option>
                ))}
            </select>

            <span className="text-danger">
              {errors.designation?.type === "required" &&
                "Designation is required"}
            </span>
          </div>

          {/* {!defaultLoader ? (
            <Loader />
          ) : (
            <div className="form-group col-md-6">
              <label>Customer Type</label>
              <select
                className="form-control"
                {...register("customerType", { required: true })}
              >
                <option value="">Select Customer Type</option>
                {loadCustomerTypeData?.data &&
                  loadCustomerTypeData?.data.map((catData) => (
                    <option value={catData.id}>{catData.name}</option>
                  ))}
              </select>
              <span className="text-danger">
                {errors.customerType?.type === "required" &&
                  "Customer Type is required"}
              </span>
            </div>
          )} */}

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
            <label>User Type</label>
            <select
              className="form-control"
              {...register("userType", { required: true })}
              value={searchObject?.user_type.id}
            >
              <option value="">Select User Type</option>
              {loadUserTypeData?.data &&
                loadUserTypeData?.data.map((catData) => (
                  <option value={catData.id}>{catData.name}</option>
                ))}
            </select>

            <span className="text-danger">
              {errors.userType?.type === "required" && "User Type is required"}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          {!btnLoader && (
            <input
              className="add-user-button"
              type="submit"
              value="Update User"
            />
          )}
          {btnLoader && (
            <button class="add-user-button" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Loading...</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
