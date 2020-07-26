import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { updateJob } from "./jobsSlice";
import {
  setJobFormShow,
  setSelectedJob,
  setTimelineShow,
} from "../modal/modalSlice";
import TimeAgo from "react-timeago";

import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import JobShow from "./JobShow/JobShow";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75%",
  }
}));

export default ({ job }) => {
    const classes = useStyles();

  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const updateJobStatus = async (e) => {
    dispatch(
      updateJob(Object.assign({}, job, { status: e.target.value }), token)
    );
  };

  const handleFormClick = () => {
    dispatch(setJobFormShow(true));
    dispatch(setSelectedJob(job.id));
  };

  const handleTimelineClick = () => {
    dispatch(setTimelineShow(true));
  };


  const handleTimelineClose = () => {
    dispatch(setTimelineShow(false));
    dispatch(setSelectedJob(null));
  };

  const modal = useSelector((state) => state.modal);
  // const { jobTimelineShow } = modal;
  let jobTimelineShow = true

  return (
    <>
      <Route path="/jobtracker/:id">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={jobTimelineShow}
          onClose={handleTimelineClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
          }}
        >
          <Fade in={jobTimelineShow}>
            <div className={classes.paper}>
              <JobShow />
            </div>
          </Fade>
        </Modal>
      </Route>
      <li>
        <div onClick={handleFormClick} className={"jobIndexItemEdit"}>
          <h3>{job.company}</h3>
          <h4>{job.job_title}</h4>
        </div>
        <select value={job.status} onChange={updateJobStatus}>
          <option value={"rejected"}>Rejected</option>
          <option value={"wishlist"}>WishList</option>
          <option value={"applied"}>Applied</option>
          <option value={"phoneScreen"}>Phone Screen</option>
          <option value={"codingChallenge"}>Coding Challenge</option>
          <option value={"techScreen"}>Tech Screen</option>
          <option value={"onsite"}>Onsite</option>
          <option value={"offer"}>Offer</option>
        </select>
        <TimeAgo date={job.last_modified} className={"timeSinceJobCreation"} />
        <Link to={`/jobtracker/${job.id}`} onClick={handleTimelineClick}>
          Status Timeline
        </Link>
      </li>
    </>
  );
};
