import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/news.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";
import moment from "moment";
import { CLEAR_ERRORS } from "../../redux/constants/newsConstant";
import {
  createOfferFunc,
  loadOfferFunc,
  updateOfferFunc,
} from "../../redux/actions/offerAction";
import { UPDATE_OFFER_RESET } from "../../redux/constants/offerConstant";

const UpdateOffer = ({ setState, pages, offerId, loadOfferData,offerData,showDetails }) => {
  var today = new Date();
  console.log(moment(today).format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const searchObject = loadOfferData?.data?.find(
    (news) => news.id === parseInt(offerId)
  );

  console.log("news  ========>>>", searchObject);

  // form validation rules
  const validationSchema = Yup.object().shape({
    offerName: Yup.string().required("Offer Name is required"),
    shortDesc: Yup.string().required("Short Description is required"),
    longDesc: Yup.string().required("Long Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("name", data.offerName);
    myForm.set("points", data.points);
    myForm.set("short_desc", data.shortDesc);
    myForm.set("long_desc", data.longDesc);
    if (data.uploadFiles[0] !== undefined) {
    myForm.set("image", data.uploadFiles[0]);
      
    }

    dispatch(updateOfferFunc(token.access_token, myForm, offerId));
  };

  const { updatedOfferError, updatedOfferSuccess } = useSelector(
    (state) => state.updateOffer
  );

  //   const { loadUserTypeData } = useSelector((state) => state.loadUserType);

  useEffect(() => {
    if (updatedOfferError) {
      alert.error(updatedOfferError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedOfferSuccess) {
      alert.success("Offer Updated Successfully!");
      setState({ right: false });
      console.log("success", updatedOfferSuccess);
      dispatch({ type: UPDATE_OFFER_RESET });

      const myForm = new FormData();
      myForm.set("per_page", 10);
      // myForm.set("page_number", pages);

      dispatch(loadOfferFunc(token?.access_token, myForm));
    }
    // dispatch(loadUserType(token?.access_token));
  }, [
    dispatch,
    token,
    updatedOfferSuccess,
    updatedOfferError,
    alert,
    setState,
    pages,
  ]);

  return (
    <div className="drawer-width-container m-4">
      {!showDetails && <h1>Update Offer</h1>}
      {showDetails && <h1> Offer Details</h1>}
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Offer Name</label>
            <input
              className={`form-control ${errors.offerName ? "is-invalid" : ""}`}
              {...register("offerName", { required: true })}
              placeholder="Offer Name"
              defaultValue={offerData?.name}
            />
            <span className="invalid-feedback text-danger">
              {errors.offerName?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Short Description</label>
            <textarea
              className={`form-control ${errors.shortDesc ? "is-invalid" : ""}`}
              {...register("shortDesc", { required: true })}
              placeholder="Short Description"
              defaultValue={offerData?.short_desc}
            />
            <span className="invalid-feedback text-danger">
              {errors.shortDesc?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Long Description</label>
            <textarea
              className={`form-control ${errors.longDesc ? "is-invalid" : ""}`}
              {...register("longDesc", { required: true })}
              placeholder="Long Description"
              defaultValue={offerData?.long_desc}
            />
            <span className="invalid-feedback text-danger">
              {errors.longDesc?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Points</label>
            <input
              className={`form-control ${errors.points ? "is-invalid" : ""}`}
              {...register("points", { required: true })}
              placeholder="Points"
              defaultValue={offerData?.points}
            />
            <span className="invalid-feedback text-danger">
              {errors.points?.message}
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

          <div id="uploadField" className="form-group col-md-12">
            <label>Upload Picture</label> <br />
            <img className="mb-2 w-100" src={offerData?.image} alt="" />
            {!showDetails &&
              <input
              id="file"
              style={{ border: "dashed #023047" }}
              className="form-control"
              {...register("uploadFiles", { required: false })}
              placeholder="Upload Files"
              type="file"
              //   onChange={() => Filevalidation()}
            />}

            <span style={{ fontSize: "12px", color: "red" }}>
              **Max Image Resolution : 1920 X 1080px Max Image Size : 10MB
            </span>
            <span className="text-danger">
              {errors.uploadFiles?.type === "required" &&
                "Upload Files is required"}
            </span>
          </div>
        </div>
        {!showDetails &&
          <div className="text-center">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Update Offer"
          />
        </div>}
      </form>
    </div>
  );
};

export default UpdateOffer;
