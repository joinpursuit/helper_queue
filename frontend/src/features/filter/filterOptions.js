import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, updateFilter } from "./filterSlice";
import Checkbox from "../../UtilComponents/Checkbox";
import "./FilterOptions.css";
import { resetPage } from "../pagination/paginationSlice";

export default function FilterOptions() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateFilter(e.target.value));
    dispatch(resetPage());
  };
  const options = [
    { status: "rejected", labelText: "Rejected" },
    { status: "wishlist", labelText: "Wishlist" },
    { status: "applied", labelText: "Applied" },
    { status: "phoneScreen", labelText: "Phone Screen" },
    { status: "codingChallenge", labelText: "Coding Challenge" },
    { status: "techScreen", labelText: "Tech Screen" },
    { status: "onsite", labelText: "Onsite" },
    { status: "offer", labelText: "Offer" },
    { status: "accepted", labelText: "Accepted" },
  ];
  return (
    <form className="filterOptions">
      {options.map(({ status, labelText }) => {
        return (
          <Checkbox
            classStyle={filter[status] ? "selected" : "hidden"}
            labelText={labelText}
            checked={filter[status]}
            handleChange={handleChange}
            value={status}
          />
        );
      })}
    </form>
  );
}
