import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import user from "../../assets/icons/man.png";
// import addFile from "../../assets/icons/add-image.png";
import {
  CLEAR_ERRORS,
  UPLOAD_PARTNER_IMAGE_RESET,
} from "../../redux/constants/partnerConstant";
import { loadNewsDetailsFunc } from "../../redux/actions/newsAction";
import NewLoader from "../loader/NewLoader";

const NewsDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { newsId } = useParams();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const { uploadPartnerImageSuccess, uploadPartnerImageError } = useSelector(
    (state) => state.uploadPartnerImage
  );

  // console.log("--->",partnerDetailsData?.data.attributes, partnerId);
  // const searchObject = loadCustomerData?.data?.find(
  //   (customer) => customer.id === parseInt(partnerId)
  // );
  // console.log(searchObject);

  //   console.log();

  // const handleImportClick = (data) => {
  //   console.log("click", data);

  //   const myForm = new FormData();
  //   myForm.set("image", data);

  //   // dispatch(uploadPartnerImageFunc(token?.access_token, myForm, newsId));
  // };

  const { newsDetailsData } = useSelector((state) => state.loadNewsDetails);

  useEffect(() => {
    setDefaultLoader(true);

    if (uploadPartnerImageError) {
      alert.error(uploadPartnerImageError.message);
      // setState({ right: false });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (uploadPartnerImageSuccess) {
      alert.success("Partner Image Upload Successfully!");
      // setState({ right: false });
      console.log("success", uploadPartnerImageSuccess);
      dispatch({ type: UPLOAD_PARTNER_IMAGE_RESET });
      dispatch(loadNewsDetailsFunc(token?.access_token, newsId));
    }
    if (token != null) {
      dispatch(loadNewsDetailsFunc(token?.access_token, newsId));
    }
  }, [
    dispatch,
    token,
    newsId,
    uploadPartnerImageError,
    uploadPartnerImageSuccess,
    alert,
  ]);

//   return (
//     <Sidebar>
//       <Navbar />
//       <div className="m-4">
//         <h1>News Details</h1>
//         {!defaultLoader ? (
//           <NewLoader />
//         ) : (
//           <>
//             <div>
//               <div className="text-center">
//                 <>
//                   {newsDetailsData?.data.image !== undefined ? (
//                     <img
//                       style={{
//                         border: "1px solid",
//                         padding: "10px",
//                         margin: "20px",
//                         width: "600px",
//                         height: "400px",
//                       }}
//                       src={newsDetailsData?.data.image}
//                       // src={user}
//                       alt=""
//                     />
//                   ) : (
//                     <img
//                       style={{
//                         border: "1px solid",
//                         padding: "10px",
//                         margin: "20px",
//                       }}
//                       src={user}
//                       alt=""
//                     />
//                   )}
//                 </>
//               </div>
//               <div style={{ marginTop: "20px" }} className="row w-100">
//                 {/* <div className="col-md-12">
//                   <h4>
//                     Partner Id : {partnerDetailsData?.data.attributes.system_id}
//                   </h4>
//                 </div> */}

//                 <div className="col-md-12 mb-3">
//                   <h4>Title : {newsDetailsData?.data.title}</h4>
//                 </div>
//                 <div className="col-md-12 mb-3">
//                   <h4>
//                     Short Description : {newsDetailsData?.data.short_desc}
//                   </h4>
//                 </div>

//                 <div className="col-md-12 mb-3">
//                   <h4>Long Description : {newsDetailsData?.data.long_desc}</h4>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </Sidebar>
//   );
// };

// export default NewsDetails;
  
return (
  <Sidebar>
    <Navbar />
    <div className="m-4">
      <h3>News Details:</h3>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          <div>
            <div className="text-center mb-5">
              <h1>{newsDetailsData?.data.title}</h1>
            </div>
            <div className="text-center">
              <>
                {newsDetailsData?.data.image !== undefined ? (
                  <img
                    style={{
                      // border: "1px solid",
                      // padding: "10px",
                      // margin: "20px",
                      width: "100%",
                      height: "400px",
                    }}
                    src={newsDetailsData?.data.image}
                    // src={user}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      border: "1px solid",
                      padding: "10px",
                      margin: "20px",
                    }}
                    src={user}
                    alt=""
                  />
                )}
              </>
            </div>
            <div style={{ marginTop: "20px" }} className="row w-100">
              {/* <div className="col-md-12">
                <h4>
                  Partner Id : {partnerDetailsData?.data.attributes.system_id}
                </h4>
              </div> */}

              <div className="col-md-12 mb-3">
                {/* <h4>Title : {newsDetailsData?.data.title}</h4> */}
              </div>
              <div className="col-md-12 mb-3">
                <h4>
                  {newsDetailsData?.data.short_desc}
                </h4>
              </div>

              <div className="col-md-12 mb-3">
                <h4>{newsDetailsData?.data.long_desc}</h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </Sidebar>
);
};

export default NewsDetails;

