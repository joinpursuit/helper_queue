import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNumberOfRows, nextPage, selectPagination, updatePage } from "./paginationSlice";
import { selectFilteredJobs } from "../jobs/jobsSlice";
import "./Pagination.css";

export default () => {
  const [rows, setRows] = useState(15);
  const { page } = useSelector(selectPagination);

  const dispatch = useDispatch();
  const filteredJobsCount = useSelector(selectFilteredJobs).length;

  const handleChange = (e) => {
    dispatch(updateNumberOfRows(e.target.value));
    setRows(e.target.value);
  };

  const numberOfPages = Math.ceil(filteredJobsCount / rows);

  const displayPageLinks = () => {
    let links = new Array(numberOfPages).fill(null);
    return links.map((_, i) => {
      return (
        <label key={i} className={page === i ? "onPage pageLabel" : "offPage pageLabel"}>
          <input value={i} type="radio" name="pages" checked={page === i} readOnly />
          {i + 1}
        </label>
      );
    });
  };

  const handlePage = (e) => {
    dispatch(updatePage(Number(e.target.value)));
    dispatch(nextPage(Number(e.target.value) * rows));
  };

  return (
    <section className="paginationContainer">
      <div className="rowCount">
        Show
        <select value={rows} onChange={handleChange}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <form className="pages" onChange={handlePage}>
        <i className="pageHeader">Pages: </i>
        {displayPageLinks()}
      </form>
    </section>
  );
};
