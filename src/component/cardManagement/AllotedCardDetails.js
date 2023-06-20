import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { disburseCard, disbursedCard } from "../../redux/actions/cardManagementAction";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import cardAllotmentImg from "../../assets/create-form-header-img/card-allotment.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Barcode from "react-barcode";
import Loader from "../loader/Loader";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DISBURSE_CARD_RESET } from "../../redux/constants/cardManagementConstant";

const AllotedCardDetails = () => {
  const navigate = useNavigate();

  const { allotedCardId } = useParams();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [cardId, setCardId] = useState("");

  let [defaultLoader, setDefaultLoader] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // form validation rules
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card Number is required"),
    phone: Yup.string()
      .min(11, "Mobile Number must be at least 11 characters")
      .max(11, "Mobile Number must be at least 11 characters")
      .required("Mobile Number is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    customerType: Yup.string().required("Customer Tyoe is required"),
    profession: Yup.string().required("Profession is required"),
    cardType: Yup.string().required("Card Tyoe is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);

  const { errors } = formState;

  const handleDisburseCard = (disburseCardId) => {
    //console.log(delteData);
    setCardId(disburseCardId);
    setOpen(true);
  };
  const handleClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(disburseCard(token?.access_token, cardId));
      ////console.log("Deleted");
    }
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();
  };

  const {
    disbursedCardDetailLoading,
    disbursedCardDetailError,
    disbursedCardDetailData,
  } = useSelector((state) => state.disbursedCardDetails);

  const {
    disburseCardLoading,
    disburseCardSuccess,
    disburseCardData,
  } = useSelector((state) => state.disburseCards);

  console.log(disbursedCardDetailData);

  useEffect(() => {
    setDefaultLoader(true);
    if (disburseCardSuccess) {
      // alert.success("Student Added Successfully");
      navigate("/cardmanagement/disbursedcardlist");
      // setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      console.log("success", disburseCardSuccess);
      dispatch({ type: DISBURSE_CARD_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (token != null) {
      dispatch(disbursedCard(token?.access_token, allotedCardId));
    }
  }, [dispatch, token, allotedCardId, disburseCardSuccess, navigate]);
  return (
    <Sidebar>
      <Navbar />
      <>
        {!defaultLoader ? (
          <Loader />
        ) : (
          <div className="m-4">
            <div className="d-flex justify-content-between">
              <h1>Alloted Card Details</h1>
              <Button
                style={{ background: "#023047" }}
                onClick={() => handleDisburseCard(disbursedCardDetailData?.data.id)}
                variant="contained"
              >
                Disburse Card
              </Button>
            </div>
            <div className="w-100 mt-5 mb-3">
              <Barcode
                width="3"
                height="60"
                value={disbursedCardDetailData?.data.number}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Card Number</label>
                  <input
                    className={`form-control ${
                      errors.cardNumber ? "is-invalid" : ""
                    }`}
                    {...register("cardNumber", { required: true })}
                    defaultValue={disbursedCardDetailData?.data.number}
                    readOnly={true}
                  />
                  <span className="invalid-feedback text-danger">
                    {errors.cardNumber?.message}
                  </span>
                </div>

                <div className="form-group col-md-6">
                  <label>Mobile Number</label>

                  <div className="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        +88
                      </span>
                    </div>
                    <input
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      {...register("phone", { required: true })}
                      defaultValue={disbursedCardDetailData?.data.phone}
                      readOnly={true}
                    />
                  </div>
                  <span className="text-danger">{errors.phone?.message}</span>
                </div>

                <div className="form-group col-md-6">
                  <label>Customer Name</label>
                  <input
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name", { required: true })}
                    defaultValue={disbursedCardDetailData?.data.first_name}
                    readOnly={true}
                  />
                  <span className="text-danger invalid-feedback">
                    {errors.name?.message}
                  </span>
                </div>

                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", { required: true })}
                    defaultValue={disbursedCardDetailData?.data.email}
                    readOnly={true}
                    autoSave="false"
                  />
                  <span className="text-danger">{errors.email?.message}</span>
                </div>

                <div className="form-group col-md-6">
                  <label>Profession</label>
                  <input
                    className={`form-control ${
                      errors.designation ? "is-invalid" : ""
                    }`}
                    {...register("profession", { required: true })}
                    defaultValue={disbursedCardDetailData?.data.profession}
                    readOnly={true}
                    autoSave="false"
                  />
                  <span className="text-danger">
                    {errors.profession?.message}
                  </span>
                </div>

                {/* {!defaultLoader ? (
            <Loader />
          ) : (
            <div className="form-group col-md-6">
              <label>Customer Type</label>
              <select
                className="form-control"
                {...register("customerType", { required: true })}
              >
                <option value="">Select Customer Type</option>
                {loadCustomerTypeData?.data &&
                  loadCustomerTypeData?.data.map((catData) => (
                    <option value={catData.id}>{catData.name}</option>
                  ))}
              </select>
              <span className="text-danger">
                {errors.customerType?.type === "required" &&
                  "Customer Type is required"}
              </span>
            </div>
          )} */}

                {/* <div className="form-group col-md-6">
              <label>Card Type</label>
              <select
                className="form-control"
                {...register("cardType", { required: true })}
              >
                <option value="">Select Card Type</option>
                <option value="1">Card Type 1</option>
                <option value="2">Card Type 2</option>
              </select>
              <span className="text-danger">
                {errors.cardType?.type === "required" && "Project is required"}
              </span>
            </div> */}
              </div>
              {/* <div className="w-100 d-flex justify-content-center">
            <input className="custom-button" type="submit" value="Allot Card" />
          </div> */}
            </form>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              style={{ textAlign: "center", width: "100%" }}
            >
              <DialogTitle id="responsive-dialog-title">
                {"Do you want to Disburse Card to this Customer?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  If you click yes card will disbursed for this customer.
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{ justifyContent: "center", padding: "40px" }}
              >
                <Button
                  style={{
                    backgroundColor: "#023047",
                    padding: "12px 42px 12px 42px",
                    color: "#fff",
                  }}
                  onClick={() => handleClose("Yes")}
                  autoFocus
                >
                  Yes
                </Button>
                <Button
                  style={{
                    backgroundColor: "#023047",
                    padding: "12px 42px 12px 42px",
                    color: "#fff",
                  }}
                  autoFocus
                  onClick={() => handleClose("No")}
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </>
    </Sidebar>
  );
};

export default AllotedCardDetails;
