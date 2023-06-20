import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import addPartnerImg from "../../assets/logo/news.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";
import moment from "moment";
import { loadNews } from "../../redux/actions/newsAction";
import {
  CLEAR_ERRORS,
  CREATE_NEWS_RESET,
} from "../../redux/constants/newsConstant";
import { useEffect } from "react";
import { useState } from "react";
import { generateCashoutReportFunc } from "../../redux/actions/reportAction";

const CashoutReportModal = ({ setState, pages }) => {
  var today = new Date();
  console.log(moment(today).format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [reportType, setReportType] = useState("DISBURSED");

  // form validation rules
  const validationSchema = Yup.object().shape({
    fromDate: Yup.string().required("From Date is required"),
    toDate: Yup.string().required("To Date Description is required"),
    maxAmount: Yup.string().required("Max Amount Description is required"),
    minAmount: Yup.string().required("Min Amount Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("date_filter", reportType);
    myForm.set("date_from", data.fromDate);
    myForm.set("date_to", data.toDate);
    myForm.set("max_amount", data.maxAmount);
    myForm.set("min_amount", data.minAmount);

    dispatch(generateCashoutReportFunc(token.access_token, myForm));
  };

  const { createdNewsError, createdNewsSuccess } = useSelector(
    (state) => state.createNews
  );

  //   const { loadUserTypeData } = useSelector((state) => state.loadUserType);

  const handleRpeortTypeChanged = (data) => {
    console.log(data);
    setReportType(data);
  };

  useEffect(() => {
    if (createdNewsError) {
      alert.error(createdNewsError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (createdNewsSuccess) {
      alert.success("News Created Successfully!");
      setState({ right: false });
      console.log("success", createdNewsSuccess);
      dispatch({ type: CREATE_NEWS_RESET });

      const myForm = new FormData();
      myForm.set("is_active", 1);
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      dispatch(loadNews(token?.access_token, myForm));
    }
    // dispatch(loadUserType(token?.access_token));
  }, [
    dispatch,
    token,
    createdNewsSuccess,
    createdNewsError,
    alert,
    setState,
    pages,
  ]);

  return (
    <div className="">
      {/* <h1>Add News</h1> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12 mt-3+">
            <label>Choose Report Type</label>
            <div className="d-flex">
              {/* <label className="mr-3">Select Identity Field</label> */}
              <div className="form-check">
                <label className="mr-3" htmlFor="disbursedRadioBtn">
                  <input
                    checked
                    {...register("checkStatus", { required: true })}
                    type="radio"
                    name="checkStatus"
                    value="DISBURSED"
                    className="form-check-input"
                    id="disbursedRadioBtn"
                    onChange={(e) => {
                      handleRpeortTypeChanged(e.target.value);
                    }}
                  />{" "}
                  Disbursed
                </label>
              </div>

              <div className="form-check">
                <label className="mr-3" htmlFor="approvedRadioBtn">
                  <input
                    {...register("checkStatus", { required: true })}
                    type="radio"
                    name="checkStatus"
                    value="APPROVED"
                    className="form-check-input"
                    id="approvedRadioBtn"
                    onChange={(e) => {
                      handleRpeortTypeChanged(e.target.value);
                    }}
                  />{" "}
                  Approved
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>From Date</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="fromDate"
              type="date"
              {...register("fromDate")}
              className={`form-control ${errors.fromDate ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.fromDate?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>To Date</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="toDate"
              type="date"
              {...register("toDate")}
              className={`form-control ${errors.toDate ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.toDate?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>Max Amount</label>
            <input
              type="number"
              className={`form-control ${errors.maxAmount ? "is-invalid" : ""}`}
              {...register("maxAmount", { required: true })}
              placeholder="Max Amount"
            />
            <span className="invalid-feedback text-danger">
              {errors.maxAmount?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Min Amount</label>
            <input
              type="number"
              className={`form-control ${errors.minAmount ? "is-invalid" : ""}`}
              {...register("minAmount", { required: true })}
              placeholder="Min Amount"
            />
            <span className="invalid-feedback text-danger">
              {errors.minAmount?.message}
            </span>
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
        <div className="text-center">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Generate Now"
          />
        </div>
      </form>
    </div>
  );
};

export default CashoutReportModal;
