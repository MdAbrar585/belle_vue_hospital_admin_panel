import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import addProjectImg from "../../assets/logo/project.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  createUser,
  loadInternalUserData,
} from "../../redux/actions/userAction";
import { CREATE_USER_RESET } from "../../redux/constants/userConstant";
import { createProject, loadProject, updateProject } from "../../redux/actions/projectAction";
import {
  CLEAR_ERRORS,
  CREATE_PROJECT_RESET,
  UPDATE_PROJECT_RESET,
} from "../../redux/constants/projectConstant";

const UpdateProject = ({ setState, setPages, pages, projectId,projectData,setStateUpdate }) => {
  console.log("projectId========", projectId, projectData);
  
  const searchObject = projectData?.data?.find(
    (customer) => customer.id === parseInt(projectId)
  );
  console.log("project  ========>>>", searchObject);
  
  const dispatch = useDispatch();

  const alert = useAlert();

  const [btnLoader, setBtnLoader] = useState(false);

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project Name is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    setBtnLoader(true);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("concern_type_id", 1);
    myForm.set("name", data.projectName);
    myForm.set("description", data.description);
    myForm.set("address", data.address);
    // myForm.set("phone", data.phone);
    // myForm.set("nid", data.nidNo);
    // myForm.set("designation_id", data.designation);
    // myForm.set("user_type_id", data.userType);
    // myForm.set("date_of_birth", data.dob);

    dispatch(updateProject(token.access_token, myForm,projectId));
  };

  const {
    updatedProjectSuccess,
    updatedProjectError,
    updatedProjectLoading,
    updatedProjectData,
  } = useSelector((state) => state.updateProjects);

  useEffect(() => {
    if (updatedProjectError) {
      alert.error(updatedProjectError.message);
      // setState({ right: false });
      setBtnLoader(false);

      dispatch({ type: CLEAR_ERRORS });
    }

    if (updatedProjectSuccess) {
      alert.success("Project Updated Successfully!");
      // navigate("/course");
      setBtnLoader(false);
      setStateUpdate({ right: false });
      setPages(pages);
      // dispatch(loadCourseData(token.accessToken, 1));
      console.log("success", updatedProjectSuccess);
      dispatch({ type: UPDATE_PROJECT_RESET });
      const myForm = new FormData();
      myForm.set("per_page", 10);
      myForm.set("page_number", pages);
      dispatch(loadProject(token?.access_token, myForm));
    }
  }, [
    dispatch,
    token,
    updatedProjectSuccess,
    updatedProjectError,
    alert,
    setStateUpdate,
    setPages,
    pages,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Update Project</h1>
      <div className="d-flex justify-content-center">
        <img style={{ width: "50%" }} src={addProjectImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Project Name</label>
            <input
              className={`form-control ${
                errors.projectName ? "is-invalid" : ""
              }`}
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              defaultValue={searchObject?.name}

            />
            <span className="invalid-feedback text-danger">
              {errors.projectName?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Address</label>
            <input
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              {...register("address", { required: true })}
              placeholder="Address"
              defaultValue={searchObject?.address}
            />
            <span className="text-danger invalid-feedback">
              {errors.address?.message}
            </span>
          </div>
          <div className="form-group col-md-12">
            <label>Description</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              {...register("description", { required: true })}
              placeholder="Description"
              defaultValue={searchObject?.description}

            />
            <span className="text-danger invalid-feedback">
              {errors.description?.message}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          {!btnLoader &&
            <input
            className="add-user-button"
            type="submit"
            value="Update Project"
          />}
          {btnLoader && (
            <button class="add-user-button" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Loading...</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
