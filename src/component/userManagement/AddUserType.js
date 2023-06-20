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
import { CREATE_USER_TYPE_RESET } from "../../redux/constants/userConstant";
import { createUserTypeFunc } from "../../redux/actions/userAction";

const AddUserType = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    userType: Yup.string().required("Designation is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.userType);

    dispatch(createUserTypeFunc(token.access_token, myForm));
  };

  const {
    createdUserTypeError,
    createdUserTypeSuccess,
    createdUserTypeLoading,
    createdUserTypeData,
  } = useSelector((state) => state.createUserType);

//   const { loadCustomerTypeData } = useSelector(
//     (state) => state.loadCustomerType
//   );

  // console.log(loadCustomerTypeData);

  useEffect(() => {
    if (createdUserTypeError) {
      alert.error(createdUserTypeError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }
    // setDefaultLoader(true);
    if (createdUserTypeSuccess) {
      alert.success("User Type Created Successfully!");
      // setState({ right: false });
      dispatch({ type: CREATE_USER_TYPE_RESET });
      handleClose("No");
      // dispatch(loadCustomer(token?.access_token));
    }
    //   if (token != null) {
    //     dispatch(loadProject(token?.access_token));
    //   }
    //   dispatch(loadCustomerType(token?.access_token));
  }, [dispatch, alert, createdUserTypeSuccess, createdUserTypeError]);

  return (
    <div>
      {/* <h5>Add Customer Type</h5> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Add User Type</label>
            <input
              className={`form-control ${
                errors.userType ? "is-invalid" : ""
              }`}
              {...register("userType", { required: true })}
              placeholder="User Type"
            />
            <span className="invalid-feedback text-danger">
              {errors.userType?.message}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <input
            className="add-user-button"
            type="submit"
            value="Create User Type"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUserType;
