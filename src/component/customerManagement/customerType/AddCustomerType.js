import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { createCustomerType } from "../../../redux/actions/customerAction";
import { CLEAR_ERRORS, CREATE_CUSTOMER_TYPE_RESET } from "../../../redux/constants/customerConstant";

const AddCustomerType = ({handleCustomerCatTypeDialogClose}) => {
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
    firstName: Yup.string().required("First Name is required"),
    
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.firstName);
    

      dispatch(createCustomerType(token.access_token, myForm));
  };

  const {
    createdCustomerTypeError,
    createdCustomerTypeSuccess,
    createdCustomerTypeLoading,
    createdCustomerTypeData,
  } = useSelector((state) => state.createCustomerType);

  const { loadCustomerTypeData } = useSelector(
    (state) => state.loadCustomerType
  );

  // console.log(loadCustomerTypeData);

  useEffect(() => {
      if (createdCustomerTypeError) {
        alert.error(createdCustomerTypeError.message);
        // setState({ right: false });
        dispatch({ type: CLEAR_ERRORS });
      }
      // setDefaultLoader(true);
      if (createdCustomerTypeSuccess) {
        alert.success("Customer Type Created Successfully!");
        // setState({ right: false });
        dispatch({ type: CREATE_CUSTOMER_TYPE_RESET });
        handleCustomerCatTypeDialogClose("No")
        // dispatch(loadCustomer(token?.access_token));
      }
    //   if (token != null) {
    //     dispatch(loadProject(token?.access_token));
    //   }
    //   dispatch(loadCustomerType(token?.access_token));
  }, [dispatch,alert,createdCustomerTypeSuccess,createdCustomerTypeError]);
  return (
    <div>
      {/* <h5>Add Customer Type</h5> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Customer Type</label>
            <input
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName", { required: true })}
              placeholder="Customer Type"
            />
            <span className="invalid-feedback text-danger">
              {errors.firstName?.message}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <input
            className="add-user-button"
            type="submit"
            value="Create Customer Type"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCustomerType;
