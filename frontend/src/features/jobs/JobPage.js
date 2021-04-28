import React from "react";
import JobsIndex from "./JobsIndex";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateJob from "./CreateJob";
import FilterOptions from '../filter/FilterOptions';
import { useSelector, useDispatch } from 'react-redux'
import { setJobFormShow, setSelectedJob } from "../modal/modalSlice";
import Pagination from "../pagination/Pagination";
import "./JobPage.css";

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
    dispatch(setJobFormShow(false))
    dispatch(setSelectedJob(null))
  };

  const modal = useSelector(state => state.modal)
  const {jobFormShow} = modal;
  return (
    <>
      <section className="jobsPageContainer">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={jobFormShow}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          }}
        >
          <Fade in={jobFormShow}>
            <div className={classes.paper} data-testid="jobFormModal">
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
