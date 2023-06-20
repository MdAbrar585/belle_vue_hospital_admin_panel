import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { createCustomerType } from "../../../redux/actions/customerAction";
import {
  CLEAR_ERRORS,
  CREATE_CUSTOMER_TYPE_RESET,
} from "../../../redux/constants/customerConstant";
import { createPartnerServiceType } from "../../../redux/actions/partnerAction";
import { CREATE_PARTNER_SERVICE_TYPE_RESET } from "../../../redux/constants/partnerConstant";

const AddPartnerServiceType = ({ handleCustomerCatTypeDialogClose }) => {
  const dispatch = useDispatch();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    partnerServiceType: Yup.string().required("Partner Service Type is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.partnerServiceType);

    dispatch(createPartnerServiceType(token.access_token, myForm));
  };

  const {
    createdPartnerServiceTypeError,
    createdPartnerServiceTypeSuccess,
    createdPartnerServiceTypeLoading,
    createdPartnerServiceTypeData,
  } = useSelector((state) => state.createPartnerServiceType);

  const { loadCustomerTypeData } = useSelector(
    (state) => state.loadCustomerType
  );

  useEffect(() => {
    if (createdPartnerServiceTypeError) {
      alert.error(createdPartnerServiceTypeError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }
    // setDefaultLoader(true);
    if (createdPartnerServiceTypeSuccess) {
      alert.success("Partner Service Type Created Successfully!");
      // setState({ right: false });
      dispatch({ type: CREATE_PARTNER_SERVICE_TYPE_RESET });
      handleCustomerCatTypeDialogClose("No");
      // dispatch(loadCustomer(token?.access_token));
    }
    //   if (token != null) {
    //     dispatch(loadProject(token?.access_token));
    //   }
    //   dispatch(loadCustomerType(token?.access_token));
  }, [dispatch, alert, createdPartnerServiceTypeSuccess, createdPartnerServiceTypeError]);
  // console.log(loadCustomerTypeData);
  return (
    <div>
      {/* <h5>Add Customer Type</h5> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Partner Service Type</label>
            <input
              className={`form-control ${errors.partnerServiceType ? "is-invalid" : ""}`}
              {...register("partnerServiceType", { required: true })}
              placeholder="Partner Service Type"
            />
            <span className="invalid-feedback text-danger">
              {errors.partnerServiceType?.message}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <input
            className="add-user-button"
            type="submit"
            value="Create Partner Service Type"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPartnerServiceType;
