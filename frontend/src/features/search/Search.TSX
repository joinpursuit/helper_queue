import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, updateSearch } from './searchSlice';
import "./Search.css";

export default () => {
    const searchTerm = useSelector(selectSearch)
    const dispatch = useDispatch();
    return (
        <input
          value={searchTerm}
          className={"searchBar"}
          placeholder="Search"
          onChange={(e) => dispatch(updateSearch(e.target.value))}
        />
    );
}
