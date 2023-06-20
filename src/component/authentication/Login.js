import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import eye from "../../assets/icons/view.png";
import { login } from "../../redux/actions/authenticationAction";
import "./Authentication.css";
import Loader from "../loader/Loader";
import { CLEAR_ERRORS } from "../../redux/constants/authenticationConstant";
import p2pLogo from "../../assets/logo/CLUB P2P.png";
import NewLoader from "../loader/NewLoader";

const Login = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();
  const [open1, setOpen1] = useState(false);
  // const [changePassword, setChangePassword] = useState("");

  const handleForgotPassword = () => {
    setOpen1(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("username", data.email);
    myForm.set("password", data.password);

    dispatch(login(myForm));
  };

  const { loginError, loginLoading, isAthenticate } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    // setLoginpage(false);
    // document.title = `Login`;
    if (loginError) {
      console.log(loginError.message);
    }

    if (loginError) {
      alert.error(loginError);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }
    if (isAthenticate) {
      localStorage.setItem(
        "logggedInCheck",
        true,
      );
      navigate("/");
    }
  }, [dispatch, isAthenticate, loginError, navigate,alert]);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  return (
    <Fragment>
      {loginLoading ? (
        <NewLoader />
      ) : (
        <div className="login-container">
          <div className="login-container-left">
            {/* <img className="e-ostad-logo" src={eOstadLogo} alt="e-ostad-logo" /> */}
            <div className="banner-div">
              {/* <img className="e-ostad-banner" src={eOstad} alt="e-ostad" /> */}
              {/* <div style={{width:"100%",}}>
          <h3
            style={{ fontSize: "50px", fontWeight: "700" }}
            className="text-left"
          >
            CLUB P2P
          </h3>
          </div> */}
              <div className="mb-3">
                <img style={{ width: "60%" }} src={p2pLogo} alt="" />
              </div>
              <h3
                style={{ fontSize: "40px", fontWeight: "700" }}
                className="text-left"
              >
                Welcome to the Admin Panel
              </h3>
              <h3 style={{ fontSize: "25px", fontWeight: "700" }}>
                <span style={{ color: "#023047" }}>Club P2P,</span>A Sister
                Concern of Plan 2 Perfection Group
              </h3>
              <h5>Developed By Coders Lab</h5>
            </div>
          </div>
          <div className="login-container-right">
            <div className="mobile">
              {/* <img
                className="e-ostad-logo-mobile"
                src={eOstadLogo}
                alt="e-ostad-logo"
              /> */}
            </div>
            <div className="right-inner-container">
              <div className="welcome-text">
                <h1>Welcome Back!</h1>
                <p>Please sign in to continue.</p>
              </div>
              <div className="login-form-div">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group">
                    <input
                      className="form-control"
                      {...register("email", { required: true })}
                      placeholder="Email or Mobile No"
                    />
                  </div>
                  <span className="text-danger mb-2">
                    {errors.email?.type === "required" && "Email or Mobile No is required"}
                  </span>
                  <div className="mb-2"></div>
                  <div className="input-group">
                    <input
                      className="form-control password"
                      type={confirmPasswordShown ? "text" : "password"}
                      {...register("password", { required: true })}
                      placeholder="Password"
                    />
                    <div
                      onClick={toggleConfirmPasswordVisiblity}
                      class="input-group-append"
                    >
                      <span class="input-group-text" id="basic-addon1">
                        <img src={eye} alt="" />
                      </span>
                    </div>
                  </div>
                  <span className="text-danger mb-2">
                    {errors.password?.type === "required" &&
                      "Password is required"}
                  </span>
                  <input
                    className="login-button"
                    type="submit"
                    value="Sign In"
                  />
                  <div className="remember-forgotpass-div">
                    <div>
                      <input className="mr-2" type="checkbox" />
                      <span>Remember Me</span>
                    </div>
                    <div>
                      {/* <Link to={"#"}> */}
                      <p onClick={() => handleForgotPassword()}>
                        Forgot Password!
                      </p>
                      {/* </Link> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
