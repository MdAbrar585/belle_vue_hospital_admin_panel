import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addPartnerImg from "../../assets/logo/news.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";
import * as Yup from "yup";
// import { useAlert } from "react-alert";
import moment from "moment";
import {
  loadNews,
  loadNewsDetailsFunc,
  updateNewsFunc,
} from "../../redux/actions/newsAction";
import {
  CLEAR_ERRORS,
  UPDATE_NEWS_RESET,
} from "../../redux/constants/newsConstant";

const UpdateNews = ({ setState, pages, newsId, loadNewsData }) => {
  var today = new Date();
  console.log(moment(today).format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const searchObject = loadNewsData?.data?.find(
    (news) => news.id === parseInt(newsId)
  );

  console.log("news  ========>>>", searchObject);
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    shortDesc: Yup.string().required("Short Description is required"),
    longDesc: Yup.string().required("Long Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data.uploadFiles[0]);
    // console.log(data.uploadFiles[0]);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("title", data.title);
    myForm.set("short_desc", data.shortDesc);
    myForm.set("long_desc", data.longDesc);
    if (data.uploadFiles[0] !== undefined) {
      myForm.set("image", data.uploadFiles[0]);
    }
    myForm.set("link", data.news_link);


    dispatch(updateNewsFunc(token.access_token, myForm, newsId));
  };

  const { updatedNewsSuccess, updatedNewsError } = useSelector(
    (state) => state.updateNews
  );

  const { newsDetailsData } = useSelector((state) => state.loadNewsDetails);

  console.log("newsDetailsData", newsDetailsData);
  //   const { loadUserTypeData } = useSelector((state) => state.loadUserType);

  useEffect(() => {
    console.log("newsId", newsId);
    dispatch(loadNewsDetailsFunc(token?.access_token, newsId));

    if (updatedNewsError) {
      alert.error(updatedNewsError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedNewsSuccess) {
      alert.success("News Updated Successfully!");
      setState({ right: false });
      console.log("success", updatedNewsSuccess);
      dispatch({ type: UPDATE_NEWS_RESET });

      const myForm = new FormData();
      myForm.set("is_active", 1);
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);

      dispatch(loadNews(token?.access_token, myForm));
    }
    // dispatch(loadUserType(token?.access_token));
  }, [
    dispatch,
    token,
    updatedNewsSuccess,
    updatedNewsError,
    alert,
    setState,
    pages,
    newsId,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Update News</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addPartnerImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Title</label>
            <input
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", { required: true })}
              placeholder="Title"
              defaultValue={searchObject?.title}
            />
            <span className="invalid-feedback text-danger">
              {errors.title?.message}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>Short Description</label>
            <textarea
              className={`form-control ${errors.shortDesc ? "is-invalid" : ""}`}
              {...register("shortDesc", { required: true })}
              placeholder="Short Description"
              defaultValue={searchObject?.short_desc}
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
              defaultValue={searchObject?.long_desc}
            />
            <span className="invalid-feedback text-danger">
              {errors.longDesc?.message}
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
            <label>Uploaded Picture</label>
            <img className="mb-2 w-100" src={searchObject?.image} alt="" />
            <input
              id="file"
              style={{ border: "dashed #023047" }}
              className="form-control"
              {...register("uploadFiles", { required: false })}
              placeholder="Upload Files"
              type="file"
              //   defaultValue={searchObject?.image}

              //   onChange={() => Filevalidation()}
            />
            <span style={{ fontSize: "12px", color: "red" }}>
              **Max Image Resolution : 1920 X 1080px Max Image Size : 10MB
            </span>
            <span className="text-danger">
              {errors.uploadFiles?.type === "required" &&
                "Upload Files is required"}
            </span>
          </div>

          <div className="form-group col-md-12">
            <label>News Link</label>
            <input
              className={`form-control ${errors.news_link ? "is-invalid" : ""}`}
              {...register("news_link")}
              placeholder="News Link"
              defaultValue={searchObject?.link}

            />
            <span className="invalid-feedback text-danger">
              {errors.news_link?.message}
            </span>
          </div>
        </div>
        <div className="text-center">
          <input
            className="add-user-button text-center"
            type="submit"
            value="Update News"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateNews;
