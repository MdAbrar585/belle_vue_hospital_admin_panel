import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cardAllotmentImg from "../../assets/create-form-header-img/card-allotment.png";
import cardAllotmentImg1 from "../../assets/logo/card.gif";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  createCustomer,
  loadCustomer,
  loadCustomerType,
} from "../../redux/actions/customerAction";
import { CREATE_CUSTOMER_RESET } from "../../redux/constants/customerConstant";
import Loader from "../loader/Loader";
import { useAlert } from "react-alert";
import {
  allocateCard,
  loadAllotedCardListData,
  loadCardType,
} from "../../redux/actions/cardManagementAction";
import {
  ALLOCATE_CARD_RESET,
  CLEAR_ERRORS,
} from "../../redux/constants/cardManagementConstant";

const CardAllotment = ({ setState }) => {
  const dispatch = useDispatch();

  const [defaultLoader, setDefaultLoader] = useState(false);

  const alert = useAlert();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [passwordShown, setPasswordShown] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [defineCardType, setDefineCardType] = useState(false);

  const [customerPhoneNo, setCustomerPhoneNo] = useState(false);

  console.log(customerPhoneNo);

  // form validation rules
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .min(8, "Card Number must be at least 8 characters")
      .max(8, "Card Number must be at least 8 characters")
      .required("Card Number is required"),
    expiredDate: Yup.string()
      .required("Expired Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phone: Yup.string()
      // .min(11, "Mobile Number must be at least 11 characters")
      // .max(11, "Mobile Number must be at least 11 characters")
      .required("Mobile Number is required"),
    // email: Yup.string().required("Email is required").email("Email is invalid"),
    // customerType: Yup.string().required("Customer Tyoe is required"),
    // profession: Yup.string().required("Profession is required"),
    cardType: Yup.string().required("Card Type is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(defineCardType);
    if (defineCardType) {
      console.log("02" + data.cardNumber);
    } else {
      console.log("03" + data.cardNumber);
    }
    // console.log(moment(startDate).format("YYYY-MM-DD"));
    const myForm = new FormData();

    myForm.set("number", data.cardNumber);
    if (defineCardType) {
      myForm.set("number", "02" + data.cardNumber);
    } else {
      myForm.set("number", "03" + data.cardNumber);
    }
    myForm.set("membership_card_type_id", data.cardType);
    myForm.set("phone", data.phone);
    myForm.set("expired_at", data.expiredDate);

    dispatch(allocateCard(token.access_token, myForm));
  };

  const { loadCustomerData } = useSelector((state) => state.loadCustomer);

  const { loadCardTypeData } = useSelector((state) => state.loadCardType);

  console.log("loadCustomerData", loadCustomerData);

  const handleMobileNumber = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      console.log("e.target.value- ");
      setShowDetails(false);
      setCustomerPhoneNo(e.target.value);
      alert.error("Please Input Customer Mobile Number");
      setState({ right: true });
    } else {
      setShowDetails(true);
      setCustomerPhoneNo(e.target.value);
    }
    if (!defaultLoader) {
      if (loadCustomerData?.data?.length === 0) {
        console.log("e.target.value- ------");

        setShowDetails(false);
        setCustomerPhoneNo(e.target.value);
        alert.error("Customer not found");
        setState({ right: false });
      }
    }

    // if (loadCustomerData?.data?.length === 0) {
    //   setShowDetails(false);
    //   setCustomerPhoneNo(e.target.value);
    //   alert.error("Customer not found");
    //   setState({ right: false });
    // } else {
    //   setShowDetails(true);
    //   setCustomerPhoneNo(e.target.value);
    // }

    const myForm = new FormData();
    myForm.set("filter", e.target.value);
    myForm.set("is_active", 1);

    if (token != null) {
      dispatch(loadCustomer(token?.access_token, myForm));
    }
  };

  const handleCardType = (data) => {
    console.log(data);
    if (data === "1") {
      setDefineCardType(true);
    } else {
      setDefineCardType(false);
    }
  };

  const { allocateCardSuccess, allocateCardDataError } = useSelector(
    (state) => state.allocateCards
  );

  const { loadCustomerTypeData } = useSelector(
    (state) => state.loadCustomerType
  );

  console.log(loadCustomerTypeData);

  useEffect(() => {
    if (allocateCardDataError) {
      alert.error(allocateCardDataError.message);
      setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }
    setDefaultLoader(true);
    if (allocateCardSuccess) {
      alert.success("Card Alloted Successfully!");
      setState({ right: false });
      console.log("success", allocateCardSuccess);
      dispatch({ type: ALLOCATE_CARD_RESET });
      dispatch(loadAllotedCardListData(token?.access_token));
    }

    // const myForm = new FormData();

    // myForm.set("filter", customerPhoneNo);
    // myForm.set("is_active", 1);

    // if (token != null) {
    //   dispatch(loadCustomer(token?.access_token, myForm));
    // }
    dispatch(loadCustomerType(token?.access_token));
    dispatch(loadCardType(token?.access_token));
  }, [
    dispatch,
    token,
    allocateCardSuccess,
    alert,
    allocateCardDataError,
    setState,
  ]);

  return (
    <div className="drawer-width-container m-4">
      <h1>Card Allotment</h1>
      <div className="w-100 d-flex justify-content-center mb-5">
        <img style={{ width: "50%" }} src={cardAllotmentImg1} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Card Type</label>

            <select
              className={`form-control ${errors.cardType ? "is-invalid" : ""}`}
              {...register("cardType", { required: true })}
              onChange={(e) => handleCardType(e.target.value)}
            >
              <option value="">Select Card Type</option>
              {loadCardTypeData?.data &&
                loadCardTypeData?.data.map((catData) => (
                  <option value={catData.id}>{catData.name}</option>
                ))}
            </select>
            <span className="invalid-feedback text-danger">
              {errors.cardType?.message}
            </span>
          </div>

          <div className="form-group col-md-6">
            <label>Card Number</label>
            <div className="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  {defineCardType && "02"}
                  {!defineCardType && "03"}
                </span>
              </div>
              <input
                className={`form-control ${
                  errors.cardNumber ? "is-invalid" : ""
                }`}
                {...register("cardNumber", { required: true })}
                placeholder="Card Number"
              />
            </div>
            <span
              style={{ color: "#023047", fontSize: "12px", fontWeight: "900" }}
            >
              <span style={{ color: "red", fontSize: "16px" }}>**</span>Also
              scan card number by barcode scanner
            </span>
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
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                {...register("phone", { required: true })}
                placeholder="Mobile Number"
                onBlur={(e) => {
                  handleMobileNumber(e);
                }}
              />
            </div>
            <span className="text-danger">{errors.phone?.message}</span>
          </div>
          {showDetails && (
            <>
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  // {...register("name", { required: true })}
                  placeholder="Name"
                  defaultValue={
                    loadCustomerData === undefined
                      ? ""
                      : loadCustomerData?.data[0]?.attributes.first_name
                  }
                  readOnly={true}
                />
                <span className="text-danger invalid-feedback">
                  {errors.name?.message}
                </span>
              </div>

              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  // {...register("email", { required: true })}
                  placeholder="Email"
                  defaultValue={
                    loadCustomerData === undefined
                      ? ""
                      : loadCustomerData?.data[0]?.attributes.email
                  }
                  readOnly={true}
                  autoSave="false"
                />
                <span className="text-danger">{errors.email?.message}</span>
              </div>

              <div className="form-group col-md-6">
                <label>Expired At</label>
                {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
                <input
                  name="expiredDate"
                  type="date"
                  {...register("expiredDate")}
                  className={`form-control ${
                    errors.expiredDate ? "is-invalid" : ""
                  }`}
                />
                <span className="text-danger">
                  {errors.expiredDate?.message}
                </span>
              </div>

              <div className="form-group col-md-6">
                <label>Profession</label>
                <input
                  className={`form-control ${
                    errors.designation ? "is-invalid" : ""
                  }`}
                  // {...register("profession", { required: true })}
                  defaultValue={
                    loadCustomerData === undefined
                      ? ""
                      : loadCustomerData?.data[0]?.attributes.profession
                  }
                  readOnly={true}
                  placeholder="Profession"
                  autoSave="false"
                />
                <span className="text-danger">
                  {errors.profession?.message}
                </span>
              </div>

              <>
                {!defaultLoader ? (
                  <Loader />
                ) : (
                  <div className="form-group col-md-6">
                    <label>Customer Type</label>
                    <input
                      className={`form-control ${
                        errors.customerType ? "is-invalid" : ""
                      }`}
                      // {...register("profession", { required: true })}
                      defaultValue={
                        loadCustomerData === undefined
                          ? ""
                          : loadCustomerData?.data[0]?.user_type?.name
                      }
                      readOnly={true}
                      placeholder="Customer Type"
                      autoSave="false"
                    />
                    <span className="text-danger">
                      {errors.customerType?.message}
                    </span>
                  </div>
                )}
              </>
            </>
          )}
        </div>
        <div className="w-100 d-flex justify-content-center">
          <input className="custom-button" type="submit" value="Allot Card" />
        </div>
      </form>
    </div>
  );
};

export default CardAllotment;
