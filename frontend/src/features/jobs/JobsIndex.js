import React, { useEffect } from 'react'
import JobsIndexItem from './JobsIndexItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredJobs, fetchAllJobs } from "./jobsSlice";
import "./JobsIndex.css";
import { selectPagination } from '../pagination/paginationSlice';

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllJobs())
    }, [dispatch])
    const jobs = useSelector(selectFilteredJobs)
    const {startIdx, endIdx} = useSelector(selectPagination)
    if(jobs.length === 0) {
        return (
          <div className="emptyJobsList">
            <span>No Jobs To Show</span>
          </div>
        );
    }
    return(
        <>
        <ul className="jobsList">
            <li id="jobListLegend">
                <div>Company / Position </div>
                <div>Status </div>
                <div className="lastModified">Time Since Last Update</div>
            </li>
            {jobs.slice(startIdx, endIdx).map(job => {
                return <JobsIndexItem job={job} key={job.id} />
            })}
        </ul>
        </>
    )
}
