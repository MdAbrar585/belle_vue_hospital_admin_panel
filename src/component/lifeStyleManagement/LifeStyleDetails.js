import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/news.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";
import { CLEAR_ERRORS } from "../../redux/constants/newsConstant";
import {
  CREATE_LIFE_STYLE_RESET,
  UPDATE_LIFE_STYLE_RESET,
} from "../../redux/constants/lifeStyleConstant";
import {
  loadLifeStyleFunc,
  updateLifeStyleFunc,
} from "../../redux/actions/lifeStyleAction";
import Loader from "../loader/Loader";
import { loadConcernTypeFunc } from "../../redux/actions/customerAction";

const LifeStyleDetails = ({
  setState,
  pages,
  loadLifeStyleData,
  lifeStyleId,
}) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const searchObject = loadLifeStyleData?.data?.find(
    (lifeStyle) => lifeStyle.id === parseInt(lifeStyleId)
  );

  console.log("lifeStyle  ========>>>",loadLifeStyleData, searchObject);

  // form validation rules
  const validationSchema = Yup.object().shape({
    lifeStyleName: Yup.string().required("Life Style Name is required"),
    shortDesc: Yup.string().required("Short Description is required"),
    longDesc: Yup.string().required("Long Description is required"),
    link: Yup.string().required("Link is required"),
    // concernType: Yup.string().required("Concern Type is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.uploadFiles);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("title", data.lifeStyleName);
    // myForm.set("points", data.points);
    myForm.set("short_desc", data.shortDesc);
    myForm.set("long_desc", data.longDesc);
    if (data.uploadFiles[0] !== undefined) {
      myForm.set("image", data.uploadFiles[0]);
    }

    myForm.set("link", data.link);
    myForm.set("concern_type_id", data.concernType);
    dispatch(updateLifeStyleFunc(token.access_token, myForm, lifeStyleId));
  };

  const { updatedLifeStyleError, updatedLifeStyleSuccess } = useSelector(
    (state) => state.updateLifeStyle
  );

  //   const { loadUserTypeData } = useSelector((state) => state.loadUserType);

  const { concernTypeData } = useSelector((state) => state.loadConcernType);

  useEffect(() => {
    setDefaultLoader(true);

    if (updatedLifeStyleError) {
      alert.error(updatedLifeStyleError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedLifeStyleSuccess) {
      alert.success("Life Style Updated Successfully!");
      setState({ right: false });
      console.log("success", updatedLifeStyleSuccess);
      dispatch({ type: UPDATE_LIFE_STYLE_RESET });

      const myForm = new FormData();
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);
      dispatch(loadLifeStyleFunc(token?.access_token, myForm));
    }
    dispatch(loadConcernTypeFunc(token?.access_token));
  }, [
    dispatch,
    token,
    updatedLifeStyleSuccess,
    updatedLifeStyleError,
    alert,
    setState,
    pages,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Life Style Details</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Life Style Name</label>
            <input
              className={`form-control ${
                errors.lifeStyleName ? "is-invalid" : ""
              }`}
              {...register("lifeStyleName", { required: true })}
              placeholder="Life Style Name"
              value={searchObject?.title}
            />
            <span className="invalid-feedback text-danger">
              {errors.lifeStyleName?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Short Description</label>
            <textarea
              className={`form-control ${errors.shortDesc ? "is-invalid" : ""}`}
              {...register("shortDesc", { required: true })}
              placeholder="Short Description"
              value={searchObject?.short_desc}
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
              value={searchObject?.long_desc}
            />
            <span className="invalid-feedback text-danger">
              {errors.longDesc?.message}
            </span>
          </div>

          {/* <div className="form-group col-md-12">
              <label>Points</label>
              <input
                className={`form-control ${errors.points ? "is-invalid" : ""}`}
                {...register("points", { required: true })}
                placeholder="Points"
              />
              <span className="invalid-feedback text-danger">
                {errors.points?.message}
              </span>
            </div> */}
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
            <label>Upload Picture</label>
            <img className="w-100 mb-3" src={searchObject?.image} alt="" />
            {/* <input
              id="file"
              style={{ border: "dashed #023047" }}
              className="form-control"
              {...register("uploadFiles", { required: false })}
              placeholder="Upload Files"
              type="file"
            /> */}

            <span style={{ fontSize: "12px", color: "red" }}>
              **Max Image Resolution : 1920 X 1080px Max Image Size : 10MB
            </span>
            <span className="text-danger">
              {errors.uploadFiles?.type === "required" &&
                "Upload Files is required"}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Link</label>
            <input
              className={`form-control ${errors.link ? "is-invalid" : ""}`}
              {...register("link", { required: true })}
              placeholder="Link"
              value={searchObject?.link}
            />
            <span className="invalid-feedback text-danger">
              {errors.link?.message}
            </span>
          </div>

          {!defaultLoader ? (
            <Loader />
          ) : (
            <div className="form-group col-md-12">
              <label>Concern Type</label>
              <select
                className="form-control"
                {...register("concernType", { required: false })}
                value={searchObject?.concern_type?.id}
              >
                <option value="">Select Concern Type</option>
                {concernTypeData &&
                  concernTypeData.map((catData) => (
                    <option value={catData?.id}>{catData?.name}</option>
                  ))}
              </select>
              <span className="text-danger">
                {errors.concernType?.type === "required" &&
                  "Concern Type is required"}
              </span>
            </div>
          )}
        </div>
        {/* <div className="text-center">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Update Life Style"
          />
        </div> */}
      </form>
    </div>
  );
};

export default LifeStyleDetails;
