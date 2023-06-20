import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import loungeImg from "../../assets/create-form-header-img/lounge.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { useState } from "react";
import { addNewLoungeFunc, loadAllLoungeFunc } from "../../redux/actions/loungeManagementAction";
import { useEffect } from "react";
import { ADD_NEW_LOUNGE_RESET, CLEAR_ERRORS } from "../../redux/constants/loungeManagementConstant";

const AddLounge = ({ setState }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    loungeName: Yup.string().required("Lounge Name is required"),
    capacity: Yup.string().required("Capacity is required"),
    location: Yup.string().required("Location is required"),
    address: Yup.string().required("Address is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.loungeName);
    myForm.set("capacity", data.capacity);
    myForm.set("location", data.location);
    myForm.set("address", data.address);

    dispatch(addNewLoungeFunc(token.access_token, myForm));
  };
  
  const {
    addNewLoungeError,
    addNewLoungeSuccess,
  } = useSelector((state) => state.addNewLounge);

  useEffect(() => {
    if (addNewLoungeError) {
      alert.error(addNewLoungeError.message);
      setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (addNewLoungeSuccess) {
      alert.success("Partner Created Successfully!");
      setState({ right: false });
      console.log("success", addNewLoungeSuccess);
      dispatch({ type: ADD_NEW_LOUNGE_RESET });
      dispatch(loadAllLoungeFunc(token?.access_token));
    }
    // dispatch(loadUserType(token?.access_token));
  }, [
    dispatch,
      token,
      addNewLoungeError,
      addNewLoungeSuccess,
      alert,
      setState
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Add Lounge</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={loungeImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Lounge Name</label>
            <input
              className={`form-control ${
                errors.loungeName ? "is-invalid" : ""
              }`}
              {...register("loungeName", { required: true })}
              placeholder="Lounge Name"
            />
            <span className="invalid-feedback text-danger">
              {errors.loungeName?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Capacity</label>
            <input
              type="number"
              className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
              {...register("capacity", { required: true })}
              placeholder="0"
            />
            <span className="invalid-feedback text-danger">
              {errors.capacity?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Location</label>
            <input
              className={`form-control ${errors.location ? "is-invalid" : ""}`}
              {...register("location", { required: true })}
              placeholder="Location"
            />
            <span className="invalid-feedback text-danger">
              {errors.location?.message}
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

          <div className="form-group col-md-12">
            <label>Address</label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              {...register("address", { required: true })}
              placeholder="Address"
            />
            <span className="invalid-feedback text-danger">
              {errors.address?.message}
            </span>
          </div>
        </div>
        <div className="col-md-12">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Add Lounge"
          />
        </div>
      </form>
    </div>
  );
};

export default AddLounge;
