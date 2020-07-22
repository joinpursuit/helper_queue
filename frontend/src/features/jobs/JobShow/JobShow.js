import React, { useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllJobStatusTimelines } from '../jobsSlice';
import { AuthContext } from '../../../providers/AuthProvider';

export default () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const job = useSelector(state => state.jobs[id]);

    const { token } = useContext(AuthContext);


    useEffect(() => {
        dispatch(fetchAllJobStatusTimelines(token, id));
    }, [token, id, dispatch])

    const hideSelf = () => history.push("/jobtracker");
    if(!job || !job.timelines) return null;

    return(
        <div>
            <button onClick={hideSelf}>Hide</button>
            {job.timelines.map(time => {
                return (
                  <div>
                    Status: {time.status}
                    <br />
                    Date:{" "}
                    {1 +
                      new Date(time.created_at).getMonth() +
                      "/" +
                      new Date(time.created_at).getDate() +
                      "/" +
                      new Date(time.created_at).getFullYear()}
                  </div>
                );
            })}
        </div>
    )
}
