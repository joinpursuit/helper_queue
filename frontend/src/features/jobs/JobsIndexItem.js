import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useDispatch } from "react-redux";
import { updateJob } from "./jobsSlice";
import { setShow, setSelectedJob } from "../modal/modalSlice";
import TimeAgo from 'react-timeago';

export default ({ job }) => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const updateJobStatus = async (e) => {
    dispatch(
      updateJob(Object.assign({}, job, { status: e.target.value }), token)
    );
  };

  const handleClick = () => {
    dispatch(setShow(true))
    dispatch(setSelectedJob(job.id))
  }
  return (
    <li>
      <div onClick={handleClick} className={"jobIndexItemEdit"}>
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
    </li>
  );
};
