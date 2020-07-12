import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, updateSearch } from './searchSlice';
import "./Search.css";

export default () => {
    const searchTerm = useSelector(selectSearch)
    const dispatch = useDispatch();
    return(
        <div className={"searchBar"}>
            <input value={searchTerm} placeholder="Search" onChange={(e) => dispatch(updateSearch(e.target.value))}/>
        </div>
    )
}
