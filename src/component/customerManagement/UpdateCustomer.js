import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addCustomerImg from "../../assets/logo/Customers.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlert } from "react-alert";
// import { CREATE_USER_RESET } from "../../redux/constants/userConstant";
import {
  loadCustomer,
  loadCustomerDetailsFunc,
  loadCustomerType,
  updateCustomer,
} from "../../redux/actions/customerAction";
import {
  CLEAR_ERRORS,
  CREATE_CUSTOMER_RESET,
  UPDATE_CUSTOMER_RESET,
} from "../../redux/constants/customerConstant";
import Loader from "../loader/Loader";
import { loadProject } from "../../redux/actions/projectAction";

const UpdateCustomer = ({
  setState,
  setPages,
  pages,
  customerId,
  customerDetailsData,
}) => {
  const dispatch = useDispatch();

  const [btnLoader, setBtnLoader] = useState(false);

  const [defaultLoader, setDefaultLoader] = useState(false);

  const [isNid, setIsNid] = useState(true);

  const [isPassport, setIsPassport] = useState(false);

  const [isBirthCertificate, setIsBirthCertificate] = useState(false);

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const handleIdentityChanged = (val) => {
    console.log(val.target.value);
    if (val.target.value === "nidRadiobtn") {
      setIsNid(true);
      setIsPassport(false);
      setIsBirthCertificate(false);
    } else if (val.target.value === "passportRadioBtn") {
      setIsNid(false);
      setIsPassport(true);
      setIsBirthCertificate(false);
    } else {
      setIsNid(false);
      setIsPassport(false);
      setIsBirthCertificate(true);
    }
  };

  // form validation rule
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
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
    email: Yup.string().required("Email is required").email("Email is invalid"),
    customerType: Yup.string().required("Customer Tyoe is required"),
    profession: Yup.string().required("Profession is required"),
    project: Yup.string().required("Project Tyoe is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    setBtnLoader(true);
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    // let NidData = "";
    // let PassportData = "";
    // let BirthCertificateData = "";

    if (isNid) {
      myForm.set("first_name", data.firstName);
      myForm.set("last_name", data.lastName);
      myForm.set("email", data.email);
      myForm.set("phone", data.phone);
      myForm.set("nid", data.nidNo);
      // myForm.set("passport", PassportData);
      // myForm.set("birth_cert", BirthCertificateData);
      myForm.set("date_of_birth", data.dob);
      myForm.set("user_type_id", data.customerType);
      myForm.set("profession", data.profession);
      myForm.set("concern_type_id", 1);
      myForm.set("concern_id", data.project);
      myForm.set("address", data.address);
      myForm.set("location", data.location);
    }

    if (isPassport) {
      myForm.set("first_name", data.firstName);
      myForm.set("last_name", data.lastName);
      myForm.set("email", data.email);
      myForm.set("phone", data.phone);
      // myForm.set("nid", NidData);
      myForm.set("passport", data.passport);
      // myForm.set("birth_cert", BirthCertificateData);
      myForm.set("date_of_birth", data.dob);
      myForm.set("user_type_id", data.customerType);
      myForm.set("profession", data.profession);
      myForm.set("concern_type_id", 1);
      myForm.set("concern_id", data.project);
      myForm.set("address", data.address);
      myForm.set("location", data.location);
    }

    if (isBirthCertificate) {
      myForm.set("first_name", data.firstName);
      myForm.set("last_name", data.lastName);
      myForm.set("email", data.email);
      myForm.set("phone", data.phone);
      // myForm.set("nid", NidData);
      // myForm.set("passport", PassportData);
      myForm.set("birth_cert", data.bithCertificate);
      myForm.set("date_of_birth", data.dob);
      myForm.set("user_type_id", data.customerType);
      myForm.set("profession", data.profession);
      myForm.set("concern_type_id", 1);
      myForm.set("concern_id", data.project);
      myForm.set("address", data.address);
      myForm.set("location", data.location);
    }

    // dispatch(createCustomer(token.access_token, myForm));
    dispatch(updateCustomer(token.access_token, myForm, customerId));
  };

  const {
    createdCustomerError,
    createdCustomerSuccess,
    createdCustomerLoading,
    createdCustomer,
  } = useSelector((state) => state.createCustomers);

  const { loadCustomerTypeData } = useSelector(
    (state) => state.loadCustomerType
  );

  const { projectLoading, projectData, projectError } = useSelector(
    (state) => state.loadProjects
  );

  const { updatedCustomerSuccess } = useSelector(
    (state) => state.updateCustomer
  );

  // const { customerDetailsLoading, customerDetailsData, customerDetailsError } =
  //   useSelector((state) => state.loadCustomerDetails);
  console.log(loadCustomerTypeData);
  useEffect(() => {
    if (createdCustomerError) {
      alert.error(createdCustomerError.message);
      setBtnLoader(false);

      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    setDefaultLoader(true);

    if (updatedCustomerSuccess) {
      alert.success("Customer Updated Successfully!");
      setBtnLoader(false);

      setState({ right: false });
      dispatch({ type: UPDATE_CUSTOMER_RESET });

      const myForm = new FormData();

      myForm.set("is_active", 1);
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      dispatch(loadCustomer(token?.access_token, myForm));
    }

    if (createdCustomerSuccess) {
      alert.success("Customer Created Successfully!");
      setBtnLoader(false);

      setState({ right: false });
      dispatch({ type: CREATE_CUSTOMER_RESET });

      const myForm = new FormData();

      myForm.set("is_active", 1);
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      dispatch(loadCustomer(token?.access_token, myForm));
    }
    if (token != null) {
      dispatch(loadProject(token?.access_token));
      dispatch(loadCustomerDetailsFunc(token?.access_token, customerId));
    }
    dispatch(loadCustomerType(token?.access_token));
  }, [
    dispatch,
    token,
    createdCustomerSuccess,
    updatedCustomerSuccess,
    setState,
    createdCustomerError,
    alert,
    pages,
    customerId,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Update Customer</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addCustomerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-6">
            <label>First Name</label>
            <input
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName", { required: false })}
              placeholder="First Name"
              defaultValue={customerDetailsData?.data.attributes.first_name}
            />
            <span className="invalid-feedback text-danger">
              {errors.firstName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Last Name</label>
            <input
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              {...register("lastName", { required: false })}
              placeholder="Last Name"
              defaultValue={customerDetailsData?.data.attributes.last_name}
            />
            <span className="text-danger invalid-feedback">
              {errors.lastName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: false })}
              placeholder="Email"
              autoSave="false"
              defaultValue={customerDetailsData?.data.attributes.email}
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
                {...register("phone", { required: false })}
                placeholder="Phone No"
                defaultValue={customerDetailsData?.data.attributes.phone}
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
              defaultValue={customerDetailsData?.data.attributes.date_of_birth}
            />
            <span className="text-danger">{errors.dob?.message}</span>
          </div>

          <div className="col-md-12 mt-3 d-flex">
            <label className="mr-3">Select Identity Field</label>

            <div className="form-check">
              <label className="mr-3" htmlFor="nidRadiobtn">
                <input
                  {...register("identityCheck", { required: false })}
                  type="radio"
                  name="identityCheck"
                  value="nidRadiobtn"
                  className="form-check-input"
                  id="nidRadiobtn"
                  onChange={(e) => {
                    handleIdentityChanged(e);
                  }}
                  checked="checked"
                />{" "}
                Nid
              </label>
            </div>

            <div className="form-check">
              <label className="mr-3" htmlFor="passportRadioBtn">
                <input
                  {...register("identityCheck", { required: false })}
                  type="radio"
                  name="identityCheck"
                  value="passportRadioBtn"
                  className="form-check-input"
                  id="passportRadioBtn"
                  onChange={(e) => {
                    handleIdentityChanged(e);
                  }}
                />{" "}
                Passport
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="birthCertificateRadioBtn">
                <input
                  {...register("identityCheck", { required: false })}
                  type="radio"
                  name="identityCheck"
                  value="birthCertificateRadioBtn"
                  className="form-check-input"
                  id="birthCertificateRadioBtn"
                  onChange={(e) => {
                    handleIdentityChanged(e);
                  }}
                />{" "}
                Birth Certificate
              </label>
            </div>
          </div>

          {isNid && (
            <div className="form-group col-md-12">
              <label>NID</label>
              <input
                className={`form-control ${errors.nidNo ? "is-invalid" : ""}`}
                {...register("nidNo", { required: false })}
                placeholder="NID"
                defaultValue={customerDetailsData?.data.attributes.nid}
              />
              <span className="text-danger">{errors.nidNo?.message}</span>
            </div>
          )}

          {isPassport && (
            <div className="form-group col-md-12">
              <label>Passport</label>
              <input
                className={`form-control ${
                  errors.passport ? "is-invalid" : ""
                }`}
                {...register("passport", { required: false })}
                placeholder="Passport"
              />
              <span className="text-danger">{errors.passport?.message}</span>
            </div>
          )}

          {isBirthCertificate && (
            <div className="form-group col-md-12">
              <label>Birth Certificate</label>
              <input
                className={`form-control ${
                  errors.bithCertificate ? "is-invalid" : ""
                }`}
                {...register("bithCertificate", { required: false })}
                placeholder="Birth Certificate"
              />
              <span className="text-danger">
                {errors.bithCertificate?.message}
              </span>
            </div>
          )}

          <div className="form-group col-md-12">
            <label>Address</label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              {...register("address", { required: false })}
              placeholder="Address"
              defaultValue={customerDetailsData?.data.attributes.address}
            />
            <span className="invalid-feedback text-danger">
              {errors.address?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Location</label>
            <input
              className={`form-control ${errors.location ? "is-invalid" : ""}`}
              {...register("location", { required: false })}
              placeholder="Location"
              defaultValue={customerDetailsData?.data.attributes.location}
            />
            <span className="invalid-feedback text-danger">
              {errors.location?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Profession</label>
            <input
              className={`form-control ${
                errors.designation ? "is-invalid" : ""
              }`}
              {...register("profession", { required: false })}
              placeholder="Profession"
              autoSave="false"
              defaultValue={customerDetailsData?.data.attributes.profession}
            />
            <span className="text-danger">{errors.profession?.message}</span>
          </div>

          {/* <div className="form-group col-md-6">
              <label>Customer Type</label>
              <input
                className={`form-control ${
                  errors.customerType ? "is-invalid" : ""
                }`}
                {...register("customerType", { required:false })}
                placeholder="User Type"
              />
              <span className="text-danger">{errors.customerType?.message}</span>
            </div> */}

          {!defaultLoader ? (
            <Loader />
          ) : (
            <div className="form-group col-md-6">
              <label>Customer Type</label>
              <select
                className="form-control"
                {...register("customerType", { required: false })}
                value={customerDetailsData?.data.user_type.id}
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
          )}

          {/* <div className="form-group col-md-6">
              <label>Project</label>
              <input
                className={`form-control ${errors.project ? "is-invalid" : ""}`}
                {...register("project", { required:false })}
                placeholder="Project"
              />
              <span className="text-danger">{errors.project?.message}</span>
            </div> */}

          <div className="form-group col-md-6">
            <label>Project</label>
            <select
              className="form-control"
              {...register("project", { required: false })}
              value={customerDetailsData?.data.concern === null ? 0 : customerDetailsData?.data.concern.id}
            >
              <option value="">Select Project</option>
              {projectData?.data &&
                projectData?.data.map((projData) => (
                  <option value={projData.id}>{projData.name}</option>
                ))}
            </select>
            {/* <select
                className="form-control"
                {...register("project", { required:false })}
              >
                <option value="">Select Project</option>
                <option value="1">Project 1</option>
                <option value="2">Project 2</option>
                <option value="3">Project 3</option>
              </select> */}
            <span className="text-danger">
              {errors.project?.type === "required" && "Project is required"}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          {!btnLoader && (
            <input
              className="add-user-button"
              type="submit"
              value="Update Customer"
              //   disabled={true}
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

export default UpdateCustomer;
