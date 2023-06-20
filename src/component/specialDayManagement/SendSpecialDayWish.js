import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import specialDay from "../../assets/logo/special_day.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";
import { CLEAR_ERRORS } from "../../redux/constants/partnerConstant";
import {
  loadSpecialDay,
  sendSpecialDayFunc,
} from "../../redux/actions/specialDayAction";
import {
  CREATE_SPECIAL_DAY_RESET,
  SEND_SPECIAL_DAY_RESET,
} from "../../redux/constants/specialDayConstant";
import { loadCustomer } from "../../redux/actions/customerAction";

const SendSpecialDayWish = ({ setStateSendWish, pages }) => {
  // var today = new Date();
  // console.log(moment(today).format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    specialDay: Yup.string().required("Special day is required"),
    customer: Yup.string().required("Message is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    //console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("special_day_id", data.specialDay);
    // myForm.set("date", moment(today).format("YYYY-MM-DD"));
    myForm.set("phone", data.customer);
    myForm.set("notification_type", parseInt(data.sendNotification));
    // myForm.set("image", data.uploadFiles[0]);

    dispatch(sendSpecialDayFunc(token.access_token, myForm));
  };

  const { createdSpecialDayError, createdSpecialDaySuccess } = useSelector(
    (state) => state.createSpecialDay
  );

  //   const { loadUserTypeData } = useSelector((state) => state.loadUserType);

  const { specialDayData } = useSelector((state) => state.loadSpecialDay);

  const { loadCustomerData } = useSelector((state) => state.loadCustomer);

  const { senddSpecialDaySuccess } = useSelector(
    (state) => state.sendSpecialDay
  );

  const handleIdentityChanged = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (createdSpecialDayError) {
      alert.error(createdSpecialDayError.message);
      setStateSendWish({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (senddSpecialDaySuccess) {
      alert.success("Wish Send Successfully!");
      setStateSendWish({ right: false });

      dispatch({ type: SEND_SPECIAL_DAY_RESET });
    }

    if (createdSpecialDaySuccess) {
      alert.success("Partner Created Successfully!");
      setStateSendWish({ right: false });
      console.log("success", createdSpecialDaySuccess);
      dispatch({ type: CREATE_SPECIAL_DAY_RESET });
      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      dispatch(loadSpecialDay(token?.access_token), myForm);
    }

    if (token != null) {
      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      dispatch(loadSpecialDay(token?.access_token), myForm);
    }

    const myForm = new FormData();
    myForm.set("is_active", 1);
    myForm.set("per_page", 1000000);
    myForm.set("page_number", 1);
    dispatch(loadCustomer(token?.access_token, myForm));
    // dispatch(loadUserType(token?.access_token));
  }, [
    dispatch,
    token,
    createdSpecialDaySuccess,
    createdSpecialDayError,
    alert,
    setStateSendWish,
    senddSpecialDaySuccess,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Send A Wish</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={specialDay} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Special Day Name</label>
            <select
              className="form-control"
              {...register("specialDay", { required: true })}
            >
              <option value="">Select Special Day Name</option>
              {specialDayData?.data &&
                specialDayData?.data.map((catData) => (
                  <option value={catData.id}>{catData.name}</option>
                ))}
            </select>

            <span className="text-danger">
              {errors.specialDay?.type === "required" &&
                "Special Day Name is required"}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Select Customer</label>
            <select
              className="form-control"
              {...register("customer", { required: true })}
            >
              <option value="">Select Customer</option>
              {loadCustomerData?.data &&
                loadCustomerData?.data.map((catData) => (
                  <option value={catData.attributes.phone}>
                    {catData.attributes.first_name}
                  </option>
                ))}
            </select>

            <span className="text-danger">
              {errors.customer?.type === "required" &&
                "Customer Name is required"}
            </span>
          </div>

          <div className="col-md-12 mt-3">
            {/* <label className="mr-3">Select Identity Field</label> */}

            <div className="form-check">
              <label className="mr-3" htmlFor="nidRadiobtn">
                <input
                  {...register("sendNotification", { required: true })}
                  type="radio"
                  name="sendNotification"
                  value="1"
                  className="form-check-input"
                  id="nidRadiobtn"
                  onChange={(e) => {
                    handleIdentityChanged(e);
                  }}
                />{" "}
                Send Notification
              </label>
            </div>

            <div className="form-check">
              <label className="mr-3" htmlFor="passportRadioBtn">
                <input
                  disabled
                  {...register("identityCheck", { required: true })}
                  type="radio"
                  name="identityCheck"
                  value="passportRadioBtn"
                  className="form-check-input"
                  id="passportRadioBtn"
                  onChange={(e) => {
                    handleIdentityChanged(e.target.value);
                  }}
                />{" "}
                Send Mobile SMS
              </label>
            </div>
          </div>

          {/* <div className="form-group col-md-12">
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
        <div className="d-flex justify-content-center">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Send A Wish"
          />
        </div>
      </form>
    </div>
  );
};

export default SendSpecialDayWish;
