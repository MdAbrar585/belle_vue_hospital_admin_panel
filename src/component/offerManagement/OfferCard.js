import React, { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import edit from '../../assets/icons/edit_w.png';
// import demoBackground from '../../assets/demo/demo.jpg';
// import deleteIcon from "../../assets/icons/delete_w.png";
// import viewIcon from "../../assets/icons/view_white.png";
import { useDispatch } from "react-redux";
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import ShareIcon from "@mui/icons-material/Share";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import UpdateSpecialDay from "../specialDayManagement/UpdateSpecialDay";
import { deleteSpecialDayfunc } from "../../redux/actions/specialDayAction";
import UpdateOffer from "./UpdateOffer";
import {
  approveOfferFunc,
  declineOfferFunc,
  deleteOfferfunc,
  loadOfferFunc,
} from "../../redux/actions/offerAction";
import trashIcon from "../../assets/icons/x-mark.png";
// import editIcon from "../../assets/icons/edit.png";
import approveIcon from "../../assets/icons/check.png";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const OfferCard = ({ offerData, loadOfferData, pages }) => {
  
  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

    
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  const [state, setState] = useState({ right: false });

  const [showDetails, setShowDetails] = useState(false);
  
  const [offerId, setOfferId] = useState("");
    
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [projectId, setProjectId] = useState("");

  const [deactiveDialogOpen, setDeactiveDialogOpen] = useState(false);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  

  const [activeDialogOpen, setActiveDialogOpen] = useState(false);

//   const [offerDataId, setSpecialDayId] = useState("");

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleActive = (activeData) => {
    //console.log(delteData);
    setProjectId(activeData);
    setActiveDialogOpen(true);
  };

  const handleActiveDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(approveOfferFunc(token?.access_token, projectId));

      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadOfferFunc(token?.access_token, myForm));
      }
      ////console.log("Deleted");
    }
    console.log("No");

    setActiveDialogOpen(false);
  };
  
  const handleDeactivate = (deleteData) => {
    //console.log(delteData);
    setProjectId(deleteData);
    setDeactiveDialogOpen(true);
  };

  const handleDeactivateDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(declineOfferFunc(token?.access_token, projectId));

      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadOfferFunc(token?.access_token, myForm));
      }
      ////console.log("Deleted");
    }
    console.log("No");

    setDeactiveDialogOpen(false);
  };
  
  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setProjectId(deleteData);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteOfferfunc(token?.access_token, projectId));

      const myForm = new FormData();
      myForm.set("per_page", 6);
      myForm.set("page_number", pages);

      if (token != null) {
        dispatch(loadOfferFunc(token?.access_token, myForm));
      }
      ////console.log("Deleted");
    }
    console.log("No");

    setDeleteDialogOpen(false);
  };

  

  const handleEdit = (right, open, viewData) => {
    // console.log(viewData);
    setOfferId(viewData);
      setState({ ...state, [right]: open });
    setShowDetails(false);
      
    };
    
  const handleView = (right, open, viewData,details) => {
    // console.log(viewData);
    setOfferId(viewData);
    setState({ ...state, [right]: open });
    setShowDetails(details);
  };

  // const [name] = offerData;
  console.log(offerData);
  let imgOfSpecialDay = offerData?.image;
  console.log(imgOfSpecialDay);

  return (
    <div className="col-md-4 mb-5">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          // style={{display:"inline-block",width:"300px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <IconButton aria-label="settings">
              <DeleteOutlineIcon onClick={() => handleDelete(offerData?.id)} />
            </IconButton>
          }
          title={offerData?.name}
          subheader={offerData?.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={offerData?.image}
          alt="No Image Found"
        />
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            {offerData?.message}
          </Typography>
        </CardContent> */}

        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton> */}
          <IconButton aria-label="share">
            <EditIcon
              onClick={() => handleEdit("right", true, offerData?.id)}
            />
          </IconButton>
          <IconButton aria-label="share">
            <RemoveRedEyeIcon
              onClick={() => handleView("right", true, offerData?.id, true)}
            />
          </IconButton>
          {offerData.is_active !== 1 ? (
            <img
              className="ml-2"
              src={approveIcon}
              onClick={() => handleActive(offerData.id)}
              alt=""
            />
          ) : (
            <img
              className="ml-2"
              src={trashIcon}
              onClick={() => handleDeactivate(offerData.id)}
              alt=""
            />
          )}
          {/* <IconButton aria-label="share">
            <RemoveRedEyeIcon />
          </IconButton> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className="mb-3" variant="body2" color="text.secondary">
              <h5>Short Description: </h5>
              {offerData?.short_desc}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <h5>Long Description: </h5>
              {offerData?.long_desc}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

      <Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <UpdateOffer
            offerData={offerData}
            loadOfferData={loadOfferData}
            offerId={offerId}
            setState={setState}
            showDetails={showDetails}
          />
        </Drawer>

        <Dialog
          fullScreen={fullScreen}
          open={activeDialogOpen}
          onClose={handleActiveDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to Active this Offer?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you click yes offer will be activated.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              onClick={() => handleActiveDialogClose("Yes")}
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
              onClick={() => handleActiveDialogClose("No")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen={fullScreen}
          open={deactiveDialogOpen}
          onClose={handleDeactivateDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to deactive this Offer?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you click yes offer will be deactivated.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              onClick={() => handleDeactivateDialogClose("Yes")}
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
              onClick={() => handleDeactivateDialogClose("No")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen={fullScreen}
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to delete this Offer?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you click yes offer will be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              onClick={() => handleDeleteDialogClose("Yes")}
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
              onClick={() => handleDeleteDialogClose("No")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default OfferCard;
