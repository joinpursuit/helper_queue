import React from "react";
import JobsIndex from "./JobsIndex";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateJob from "./CreateJob";
import FilterOptions from '../filter/filterOptions';
import { useSelector, useDispatch } from 'react-redux'
import { setShow, setSelectedJob } from "../modal/modalSlice";
import Pagination from "../pagination/Pagination";
import "./JobPage.css";
import { Route } from "react-router-dom";
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
    width: "75%"
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleClose = () => { 
    dispatch(setShow(false))
    dispatch(setSelectedJob(null))
  };

  const modal = useSelector(state => state.modal)
  const {show} = modal;
  return (
    <>
      <Route path="/jobtracker/:id">
        <JobShow />
      </Route>
    <section className="jobsPageContainer">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={classes.paper}>
            <CreateJob handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
      <FilterOptions />
      <JobsIndex />
      <Pagination />
    </section>
  </>
  );
};
