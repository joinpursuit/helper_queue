import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectJobs, fetchAllJobs } from '../jobsSlice';
import './JobStats.css';

export default () => {

    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs)
    useEffect(() => {
        if(!jobs.length) {
            dispatch(fetchAllJobs())
        }
    }, [])

    const calculateTotalAppsThisWeek = () => {
        let totalAppsThisWeek = 0;
        let oneWeekAgo = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
        jobs.forEach((job => {
            job.timelines.forEach((timeObj) => {
                if (
                  timeObj.status === "applied" &&
                  new Date(timeObj.created_at) > oneWeekAgo
                ) {
                  totalAppsThisWeek++;
                }
            })
        }))
        return totalAppsThisWeek;
    }
    return (
      <div className="adminContainer">
        <h3>Stats Page</h3>
        <div>
          <p>Total Applications: {jobs.length}</p>
          <p>
            Number Of Applications this week: {calculateTotalAppsThisWeek()}
          </p>
          Total Companies on Wishlist: Applications still in applied stage:
          Total rejections: Total phone screens scheduled: Total technical
          screens: Total onsites: Total offers:
        </div>
      </div>
    );
}
