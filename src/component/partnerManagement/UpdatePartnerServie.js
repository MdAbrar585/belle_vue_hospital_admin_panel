import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/partner.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";

import {
  CLEAR_ERRORS,
  CREATE_PARTNER_SERVICE_RESET,
  UPDATE_PARTNER_SERVICE_RESET,
} from "../../redux/constants/partnerConstant";
import {
  createPartnerService,
  loadPartnerData,
  loadPartnerService,
  loadPartnerServiceType,
  updatePartnerServiceFunc,
} from "../../redux/actions/partnerAction";

const UpdatePartnerServie = ({ setState, partnerServiceData, serviceId }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const searchObject = partnerServiceData?.data?.find(
    (news) => news.id === parseInt(serviceId)
  );

  console.log("service  ========>>>", searchObject);
  // form validation rules
  const validationSchema = Yup.object().shape({
    // partnerName: Yup.string().required("Partner name is required"),
    // serviceName: Yup.string().required("Service name is required"),
    // serviceType: Yup.string().required("Service type is required"),
    // shortdescription: Yup.string().required("Short Description is required"),
    // longdescription: Yup.string().required("Long Description is required"),
    // price: Yup.string().required("Price is required"),
    // discount: Yup.string().required("Discount is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("user_id", parseInt(data.partnerName));
    myForm.set("service_name", data.serviceName);
    myForm.set("service_type_id", parseInt(data.serviceType));
    myForm.set("value", data.price);
    myForm.set("short_desc", data.shortdescription);
    myForm.set("long_desc", data.longdescription);
    myForm.set("discount", data.discount);
    if (data.uploadFiles[0] !== undefined) {
      myForm.set("image", data.uploadFiles[0]);
    }

    dispatch(updatePartnerServiceFunc(token.access_token, myForm,serviceId));
  };

  const { createdPartnerServiceError, createdPartnerServiceSuccess } =
        useSelector((state) => state.createPartnerService);
    
  const { updatedPartnerServiceError, updatedPartnerServiceSuccess } =
    useSelector((state) => state.updatePartnerService);

  const { partnerData } = useSelector((state) => state.loadPartners);

  const {
    partnerServiceTypeLoading,
    partnerServiceTypeData,
    partnerServiceTypeError,
  } = useSelector((state) => state.loadPartnerServiceType);

  useEffect(() => {
    if (updatedPartnerServiceError) {
      alert.error(updatedPartnerServiceError.message);
      setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedPartnerServiceSuccess) {
      alert.success("Partner Service Updated Successfully!");
      setState({ right: false });
      console.log("success", updatedPartnerServiceSuccess);
      dispatch({ type: UPDATE_PARTNER_SERVICE_RESET });
      dispatch(loadPartnerService(token?.access_token));
    }
    dispatch(loadPartnerData(token?.access_token));
    dispatch(loadPartnerServiceType(token?.access_token));
  }, [
    dispatch,
    token,
    updatedPartnerServiceSuccess,
    updatedPartnerServiceError,
    alert,
    setState,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Update Partner Service</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Partner Name</label>
            <select
              className="form-control"
              {...register("partnerName", { required: true })}
              value={searchObject?.partner?.id}
            >
              <option value="">Select Partner Name</option>
              {partnerData?.data &&
                partnerData?.data.map((partnar) => (
                  <option value={partnar.id}>
                    {partnar.attributes.partner_name}
                  </option>
                ))}
            </select>
            <span className="text-danger">
              {errors.partnerName?.type === "required" &&
                "Partner Name is required"}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Service Name</label>
            <input
              className={`form-control ${
                errors.serviceName ? "is-invalid" : ""
              }`}
              {...register("serviceName", { required: true })}
              placeholder="Service Name"
              defaultValue={searchObject?.service_name}
            />
            <span className="invalid-feedback text-danger">
              {errors.serviceName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Service Type</label>
            <select
              className="form-control"
              {...register("serviceType")}
              value={searchObject?.service_type?.id}
            >
              <option value="">Select Partner Name</option>
              {partnerServiceTypeData?.data &&
                partnerServiceTypeData?.data.map((partnar) => (
                  <option value={partnar.id}>{partnar.name}</option>
                ))}
            </select>
            {/* <input
              className={`form-control ${
                errors.serviceType ? "is-invalid" : ""
              }`}
              {...register("serviceType", { required: true })}
              placeholder="Service Type"
            /> */}
            <span className="text-danger invalid-feedback">
              {errors.serviceType?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Short Description</label>
            <input
              className={`form-control ${
                errors.shortdescription ? "is-invalid" : ""
              }`}
              {...register("shortdescription")}
              placeholder="Short Description"
              autoSave="false"
              defaultValue={searchObject?.short_desc}
            />
            <span className="text-danger">
              {errors.shortdescription?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Long Description</label>
            <textarea
              className={`form-control ${
                errors.longdescription ? "is-invalid" : ""
              }`}
              {...register("longdescription", { required: true })}
              placeholder="Long Description"
              autoSave="false"
              defaultValue={searchObject?.long_desc}
            />
            <span className="text-danger">
              {errors.longdescription?.message}
            </span>
          </div>

          <div id="uploadField" className="form-group col-md-12">
            <label>Upload Picture</label>
            <img className="w-100 mb-3" src={searchObject?.image} alt="" />
            <input
              id="file"
              style={{ border: "dashed #023047" }}
              className="form-control"
              {...register("uploadFiles", { required: false })}
              placeholder="Upload Files"
              type="file"
              //   onChange={() => Filevalidation()}
            />

            <span className="text-danger">
              {errors.uploadFiles?.type === "required" &&
                "Upload Files is required"}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Price</label>
            <input
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              {...register("price", { required: true })}
              placeholder="Price"
              autoSave="false"
              defaultValue={searchObject?.value}
            />
            <span className="text-danger">{errors.price?.message}</span>
          </div>

          <div className="form-group col-md-6">
            <label>Discount</label>
            <input
              className={`form-control ${errors.discount ? "is-invalid" : ""}`}
              {...register("discount", { required: true })}
              placeholder="Discount"
              autoSave="false"
              defaultValue={searchObject?.discount}
            />
            <span className="text-danger">{errors.discount?.message}</span>
          </div>
        </div>
        <div className="col-md-12">
          <input
            className="add-user-button"
            type="submit"
            value="Update Partner Service"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePartnerServie;
