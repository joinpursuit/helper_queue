import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectJobs } from '../jobsSlice';

export default () => {

    const dispatch = useDispatch();
    const jobs = 
    useEffect(() => {

    }, [])
    return(
        <div>
            <h3>Stats Page</h3>
            <div>
                current applications applied including wishList: 
                current applications applied NOT wishList: 
                current rejections:
                alltime phone screens:
                alltime technical screen:
                alltime onsites:
                alltime offers: 
            </div>
        </div>
    )
}
