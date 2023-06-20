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
import deleteIcon from "../../assets/icons/delete_w.png";
import viewIcon from "../../assets/icons/view_white.png";
import { useDispatch } from "react-redux";
import { deleteSpecialDayfunc } from "../../redux/actions/specialDayAction";
import { Drawer } from "@mui/material";
import SpecialDayDetails from "./SpecialDayDetails";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdateSpecialDay from "./UpdateSpecialDay";

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

const SpecialDayCard = ({ specialDay }) => {
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [specialDayId, setSpecialDayId] = useState("");

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteSpecialDayfunc(token?.access_token, specialDayId));
      ////console.log("Deleted");
    }
    // console.log("No");

    setDeleteDialogOpen(false);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setSpecialDayId(deleteData);
    setDeleteDialogOpen(true);
  };

  const handleView = (right, open, viewData) => {
    // console.log(viewData);
    setSpecialDayId(viewData);
    setState({ ...state, [right]: open });
  };

  // const [name] = specialDay;
  console.log(specialDay);
  let imgOfSpecialDay = specialDay?.image;
  console.log(imgOfSpecialDay);

  return (
    // <div className="col-md-3">
    //   <div
    //     style={{ backgroundColor: "#023047" }}
    //     // style={{
    //     //   backgroundImage: `url(${imgOfSpecialDay})`,
    //     //   backgroundPosition: 'center',
    //     //   backgroundSize: 'cover',
    //     // }}
    //     className="d-flex justify-content-between w-100 dash-card"
    //   >
    //     <div>
    //       <h4>{specialDay?.name}</h4>
    //       <h6>{specialDay?.date}</h6>
    //       {/* <img src={specialDay?.image} alt="" /> */}
    //     </div>
    //     <div className="d-flex align-items-end">
    //       <div className="d-flex">
    //         <img
    //           onClick={() => handleView("right", true, specialDay?.id)}
    //           src={viewIcon}
    //           alt=""
    //         />
    //         <img
    //           style={{ marginLeft: "5px" }}
    //           src={deleteIcon}
    //           alt=""
    //           onClick={() => handleDelete(specialDay?.id)}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <Fragment>
    //     <Drawer
    //       anchor={"right"}
    //       open={state["right"]}
    //       onClose={toggleDrawer("right", false)}
    //     >
    //       <SpecialDayDetails
    //         specialDay={specialDay}
    //         specialDayId={specialDayId}
    //       />
    //     </Drawer>

    //     <Dialog
    //       fullScreen={fullScreen}
    //       open={deleteDialogOpen}
    //       onClose={handleDeleteDialogClose}
    //       aria-labelledby="responsive-dialog-title"
    //       style={{ textAlign: "center", width: "100%" }}
    //     >
    //       <DialogTitle id="responsive-dialog-title">
    //         {"Do you want to delete this Special Day?"}
    //       </DialogTitle>
    //       <DialogContent>
    //         <DialogContentText>
    //           If you click yes special day will be deleted.
    //         </DialogContentText>
    //       </DialogContent>
    //       <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
    //         <Button
    //           style={{
    //             backgroundColor: "#023047",
    //             padding: "12px 42px 12px 42px",
    //             color: "#fff",
    //           }}
    //           onClick={() => handleDeleteDialogClose("Yes")}
    //           autoFocus
    //         >
    //           Yes
    //         </Button>
    //         <Button
    //           style={{
    //             backgroundColor: "#023047",
    //             padding: "12px 42px 12px 42px",
    //             color: "#fff",
    //           }}
    //           autoFocus
    //           onClick={() => handleDeleteDialogClose("No")}
    //         >
    //           No
    //         </Button>
    //       </DialogActions>
    //     </Dialog>
    //   </Fragment>
    // </div>

    <div className="col-md-4 mb-5">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <IconButton aria-label="settings">
              <DeleteOutlineIcon onClick={() => handleDelete(specialDay?.id)} />
            </IconButton>
          }
          title={specialDay?.name}
          subheader={specialDay?.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={specialDay?.image}
          alt="Paella dish"
        />
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            {specialDay?.message}
          </Typography>
        </CardContent> */}

        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton> */}
          <IconButton aria-label="share">
            <EditIcon
              onClick={() => handleView("right", true, specialDay?.id)}
            />
          </IconButton>
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
            <Typography variant="body2" color="text.secondary">
              {specialDay?.message}
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
          <UpdateSpecialDay
            specialDayData={specialDay}
            specialDayId={specialDayId}
            setState={setState}
          />
        </Drawer>

        <Dialog
          fullScreen={fullScreen}
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to delete this Special Day?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you click yes special day will be deleted.
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

export default SpecialDayCard;
