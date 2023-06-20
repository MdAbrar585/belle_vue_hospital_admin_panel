import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/partner.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import {
  createUser,
  loadInternalUserData,
  loadUserType,
} from "../../redux/actions/userAction";
// import { useAlert } from "react-alert";
import { CREATE_USER_RESET } from "../../redux/constants/userConstant";
import {
  createPartner,
  createPartnerTypeFunc,
  loadPartnerData,
  loadPartnerTypeFunc,
} from "../../redux/actions/partnerAction";
import {
  CLEAR_ERRORS,
  CREATE_PARTNER_RESET,
  CREATE_PARTNER_SERVICE_TYPE_RESET,
  CREATE_PARTNER_TYPE_RESET,
} from "../../redux/constants/partnerConstant";

const AddPartnerType = ({ handleClose }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    partnerType: Yup.string().required("Partner Type is required"),
    
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.partnerType);
    

    dispatch(createPartnerTypeFunc(token.access_token, myForm));
  };

  const {
    createdPartnerTypeError,
    createdPartnerTypeSuccess,
    createdPartnerTypeLoading,
    createdPartnerType,
  } = useSelector((state) => state.createPartnerType);

  const { partnerTypeData } = useSelector((state) => state.loadPartnerType);

  useEffect(() => {
    if (createdPartnerTypeError) {
      alert.error(createdPartnerTypeError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (createdPartnerTypeSuccess) {
      alert.success("Partner Type Created Successfully!");
      //   setState({ right: false });
      console.log("success", createdPartnerTypeSuccess);
      dispatch({ type: CREATE_PARTNER_TYPE_RESET });
        dispatch(loadPartnerData(token?.access_token));
        handleClose();
    }
    dispatch(loadPartnerTypeFunc(token?.access_token));
  }, [
    dispatch,
    token,
    createdPartnerTypeSuccess,
    createdPartnerTypeError,
    alert,
  ]);

  return (
    <div className="m-4">
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Partner Type</label>
            <input
              className={`form-control ${
                errors.partnerType ? "is-invalid" : ""
              }`}
              {...register("partnerType", { required: true })}
              placeholder="Partner Type"
            />
            <span className="invalid-feedback text-danger">
              {errors.partnerType?.message}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <input
            className="add-user-button"
            type="submit"
            value="Create Partner Type"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPartnerType;
