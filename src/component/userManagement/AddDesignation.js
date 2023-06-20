import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { createCustomerType } from "../../redux/actions/customerAction";
import {
  CLEAR_ERRORS,
  CREATE_CUSTOMER_TYPE_RESET,
} from "../../redux/constants/customerConstant";
import { CREATE_DESIGNATION_RESET } from "../../redux/constants/userConstant";
import { createDesignationFunc } from "../../redux/actions/userAction";

const AddDesignation = ({ handleCustomerCatTypeDialogClose }) => {
  const dispatch = useDispatch();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    designation: Yup.string().required("Designation is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.designation);

    dispatch(createDesignationFunc(token.access_token, myForm));
  };

  const {
    createdDesignationError,
    createdDesignationSuccess,
    createdDesignationLoading,
    createdDesignationData,
  } = useSelector((state) => state.createDesignation);

  const { loadCustomerTypeData } = useSelector(
    (state) => state.loadCustomerType
  );

  // console.log(loadCustomerTypeData);

  useEffect(() => {
    if (createdDesignationError) {
      alert.error(createdDesignationError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }
    // setDefaultLoader(true);
    if (createdDesignationSuccess) {
      alert.success("Designation Created Successfully!");
      // setState({ right: false });
      dispatch({ type: CREATE_DESIGNATION_RESET });
      handleCustomerCatTypeDialogClose("No");
      // dispatch(loadCustomer(token?.access_token));
    }
    //   if (token != null) {
    //     dispatch(loadProject(token?.access_token));
    //   }
    //   dispatch(loadCustomerType(token?.access_token));
  }, [dispatch, alert, createdDesignationSuccess, createdDesignationError]);

  return (
    <div>
      {/* <h5>Add Customer Type</h5> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Designation</label>
            <input
              className={`form-control ${errors.designation ? "is-invalid" : ""}`}
              {...register("designation", { required: true })}
              placeholder="Designation"
            />
            <span className="invalid-feedback text-danger">
              {errors.designation?.message}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <input
            className="add-user-button"
            type="submit"
            value="Create Designation"
          />
        </div>
      </form>
    </div>
  );
};

export default AddDesignation;
