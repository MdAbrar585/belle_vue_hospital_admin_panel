import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import specialDay from "../../assets/logo/special_day.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import {
  loadTimingByLoungeFunc,
  setLoungeTimingFunc,
} from "../../redux/actions/loungeManagementAction";
import LoungeTimingList from "./LoungeTimingList";
import Loader from "../loader/Loader";
import { CLEAR_ERRORS, SET_LOUNGE_TIMING_RESET } from "../../redux/constants/loungeManagementConstant";

const SetLoungeTiming = ({ loungId }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    fromTime: Yup.string().required("From Time is required"),
    toTime: Yup.string().required("To Time is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("lounge_id", loungId);
    myForm.set("from", data.fromTime);
    myForm.set("to", data.toTime);

    dispatch(setLoungeTimingFunc(token.access_token, myForm));
  };

  const {
    loadTimingByLoungeLoading,
    loadTimingByLoungeData,
    loadTimingByLoungeError,
  } = useSelector((state) => state.loadTimingByLounge);

  const {
      setLoungeTimingLoading,
      setLoungeTimingSuccess,
      setLoungeTimingData,
      setLoungeTimingError
  } = useSelector((state) => state.setLoungeTiming);
  
  console.log("loadTimingByLoungeData", loadTimingByLoungeData);

  useEffect(() => {
    setDefaultLoader(true);
    
    if (setLoungeTimingError) {
        alert.error(setLoungeTimingError.message);
        // setState({ right: false });
        dispatch({ type: CLEAR_ERRORS });
      }
  
      if (setLoungeTimingSuccess) {
        alert.success("Lounge Timing Set Successfully!");
        // setState({ right: false });
        console.log("success", setLoungeTimingSuccess);
        dispatch({ type: SET_LOUNGE_TIMING_RESET });
        dispatch(loadTimingByLoungeFunc(token?.access_token));
      }

    console.log(loungId);
    if (token != null) {
      dispatch(loadTimingByLoungeFunc(token?.access_token, loungId));
    }
  }, [dispatch, token, loungId,setLoungeTimingSuccess,setLoungeTimingError,alert]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Set Lounge Timing</h1>
      <div className="d-flex justify-content-center">
        {/* <img style={{ width: "50%" }} src={specialDay} alt="" /> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>From Date</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="fromTime"
              type="time"
              {...register("fromTime")}
              className={`form-control ${errors.fromTime ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.fromTime?.message}</span>
          </div>

          <div className="form-group col-md-12">
            <label>To Date</label>
            {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
            <input
              name="toTime"
              type="time"
              {...register("toTime")}
              className={`form-control ${errors.toTime ? "is-invalid" : ""}`}
            />
            <span className="text-danger">{errors.toTime?.message}</span>
          </div>
        </div>
        <div className="">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Add Lounge"
          />
        </div>
      </form>
      { !defaultLoader ? <Loader /> : 
        <div>
          <LoungeTimingList loungId={loungId} loadTimingByLounge={loadTimingByLoungeData} />
        </div>
      }
    </div>
  );
};

export default SetLoungeTiming;
