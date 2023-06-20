import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import specialDay from "../../assets/logo/special_day.gif";
import meetingImage from "../../assets/create-form-header-img/meeting_1.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { useState } from "react";
import {
  loadAllLoungeFunc,
  loadTimingByLoungeFunc,
} from "../../redux/actions/loungeManagementAction";
import { useEffect } from "react";
import { CLEAR_ERRORS } from "../../redux/constants/loungeManagementConstant";
import Loader from "../loader/Loader";
import { loadCustomer } from "../../redux/actions/customerAction";
import {
  bookMeetingFunc,
  getDateWiseMeetingFunc,
} from "../../redux/actions/meetingManagementAction";
import { BOOK_MEETING_RESET } from "../../redux/constants/meetingManagementConstant";
import moment from "moment";

const AddMeeting = ({ setState }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [defaultLoader, setDefaultLoader] = useState(false);

  const [customerInfo, setCustomerInfo] = useState(false);

  const date = new Date();

  let [dateForMeeting, setDateForMeeting] = useState(
    moment(date).format("YYYY-MM-DD")
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    meetingName: Yup.string().required("Meeting Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    // customerName: Yup.string().required("Customer Name is required"),
    // customerType: Yup.string().required("Customer Type is required"),
    guests: Yup.string().required("Guests is required"),
    selectLounge: Yup.string().required("Lounge is required"),
    selectLoungeType: Yup.string().required("Lounge Type is required"),

    date: Yup.string()
      .required("Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date must be a valid date in the format YYYY-MM-DD"
      ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    console.log(loadCustomerData?.data[0]?.id);

    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.meetingName);
    myForm.set("date", data.date);
    myForm.set("guests", data.guests);
    myForm.set("lounge_timing_id", data.selectLoungeType);
    myForm.set("lounge_id", data.selectLounge);
    myForm.set("user_id", loadCustomerData?.data[0]?.id);
    dispatch(bookMeetingFunc(token.access_token, myForm));
  };

  const { loadAllLoungeData } = useSelector((state) => state.loadAllLounge);

  const { loadTimingByLoungeData } = useSelector(
    (state) => state.loadTimingByLounge
  );

  const handleChange = (data) => {
    console.log(data);
    dispatch(loadTimingByLoungeFunc(token?.access_token, data));
  };

  const { loadCustomerData } = useSelector((state) => state.loadCustomer);

  console.log("loadCustomerData", loadCustomerData);
  const handleMobileNumber = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      console.log("e.target.value- ");
      //   setShowDetails(false);
      //   setCustomerPhoneNo(e.target.value);
      alert.error("Please Input Customer Mobile Number");
      // setState({ right: true });
    } else {
      setCustomerInfo(true);
      const myForm = new FormData();
      myForm.set("filter", e.target.value);
      myForm.set("is_active", 1);

      if (token != null) {
        dispatch(loadCustomer(token?.access_token, myForm));
      }
      //   setShowDetails(true);
      //   setCustomerPhoneNo(e.target.value);
    }
    if (!defaultLoader) {
      if (loadCustomerData?.data?.length === 0) {
        console.log("e.target.value- ------");

        // setShowDetails(false);
        // setCustomerPhoneNo(e.target.value);
        alert.error("Customer not found");
        // setState({ right: false });
      }
    }
  };

  const { addNewLoungeError, bookMeetingSuccess } = useSelector(
    (state) => state.bookMeeting
  );

  useEffect(() => {
    setDefaultLoader(true);

    if (addNewLoungeError) {
      alert.error(addNewLoungeError.message);
      setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (bookMeetingSuccess) {
      alert.success("Meeting Created Successfully!");
      setState({ right: false });
      console.log("success", bookMeetingSuccess);
      dispatch({ type: BOOK_MEETING_RESET });
      dispatch(getDateWiseMeetingFunc(token?.access_token, dateForMeeting));
    }
    dispatch(loadAllLoungeFunc(token?.access_token));

    // dispatch(loadUserType(token?.access_token));
  }, [
    dispatch,
    token,
    addNewLoungeError,
    bookMeetingSuccess,
    alert,
    setState,
    dateForMeeting,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <div className="text-center">
        <img style={{width:"50%"}} src={meetingImage} alt="" />
      </div>
      <h1>Book A Meeting</h1>
      <div className="d-flex justify-content-center">
        {/* <img style={{ width: "50%" }} src={specialDay} alt="" /> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Meeting Name</label>
            <input
              className={`form-control ${
                errors.meetingName ? "is-invalid" : ""
              }`}
              {...register("meetingName", { required: true })}
              placeholder="Meeting Name"
            />
            <span className="invalid-feedback text-danger">
              {errors.meetingName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Phone Number</label>
            <input
              className={`form-control ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              {...register("phoneNumber", { required: true })}
              placeholder="Phone Number"
              onBlur={(e) => {
                handleMobileNumber(e);
              }}
            />
            <span className="invalid-feedback text-danger">
              {errors.phoneNumber?.message}
            </span>
          </div>

          {!defaultLoader ? (
            <Loader />
          ) : (
            <>
              <div className="form-group col-md-6">
                <label>Customer Name</label>
                <input
                  className={`form-control ${
                    errors.customerName ? "is-invalid" : ""
                  }`}
                  {...register("customerName", { required: true })}
                  placeholder="Customer Name"
                  defaultValue={
                    !customerInfo
                      ? ""
                      : loadCustomerData?.data[0]?.attributes.first_name
                  }
                />
                <span className="invalid-feedback text-danger">
                  {errors.customerName?.message}
                </span>
              </div>

              <div className="form-group col-md-6">
                <label>Customer Type</label>
                <input
                  className={`form-control ${
                    errors.customerType ? "is-invalid" : ""
                  }`}
                  {...register("customerType", { required: true })}
                  placeholder="Customer Type"
                  defaultValue={
                    !customerInfo
                      ? ""
                      : loadCustomerData?.data[0]?.user_type.name
                  }
                />
                <span className="invalid-feedback text-danger">
                  {errors.customerType?.message}
                </span>
              </div>
            </>
          )}

          <div className="form-group col-md-6">
            <label>Guests</label>
            <input
              type="number"
              className={`form-control ${errors.guests ? "is-invalid" : ""}`}
              {...register("guests", { required: true })}
              placeholder="Guests"
            />
            <span className="invalid-feedback text-danger">
              {errors.guests?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Date</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="date"
              type="date"
              {...register("date")}
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.date?.message}</span>
          </div>

          {!defaultLoader ? (
            <Loader />
          ) : (
            <div className="form-group col-md-6">
              <label>Select Lounge</label>
              <select
                {...register("selectLounge")}
                className={`form-control ${
                  errors.selectLounge ? "is-invalid" : ""
                }`}
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="">Select Lounge</option>
                {loadAllLoungeData?.data &&
                  loadAllLoungeData?.data.map((loungeData) => (
                    <option value={loungeData.id}>{loungeData.name}</option>
                  ))}
              </select>
              <span className="text-danger">
                {errors.selectLounge?.message}
              </span>
            </div>
          )}

          {!defaultLoader ? (
            <Loader />
          ) : (
            <div className="form-group col-md-6">
              <label>Select Lounge Timing</label>
              <select
                {...register("selectLoungeType")}
                className={`form-control ${
                  errors.selectLoungeType ? "is-invalid" : ""
                }`}
                // onChange={(e) => handleChange(e.target.value)}
              >
                <option value="">Select Lounge Timing</option>
                {loadTimingByLoungeData?.data &&
                  loadTimingByLoungeData?.data.map((loungeData) => (
                    <option value={loungeData.id}>
                      {loungeData.from + " - " + loungeData.to}
                    </option>
                  ))}
              </select>
              <span className="text-danger">
                {errors.selectLoungeType?.message}
              </span>
            </div>
          )}
          {/* <div className="form-group col-md-6">
            <input
              type="file"
              className={`form-control ${errors.picture ? "is-invalid" : ""}`}
              {...register("picture", { required: true })}
              placeholder="Message"
                      />
            <label>Upload Picture</label>
                      
            <span className="invalid-feedback text-danger">
              {errors.picture?.message}
            </span>
          </div> */}
        </div>
        <div className="text-center">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Book A Meeting"
          />
        </div>
      </form>
    </div>
  );
};

export default AddMeeting;
