import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, updateFilter } from './filterSlice';
import './filterOptions.css';
import { resetPage } from '../pagination/paginationSlice';

export default () => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(updateFilter(e.target.value))
        dispatch(resetPage())
    }
    return(
        <form className="filterOptions" >
            <label className={filter["rejected"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["rejected"]} value={"rejected"} onChange={handleChange}/>Rejected</label>
            <label className={filter["wishlist"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["wishlist"]} value={"wishlist"} onChange={handleChange}/>WishList</label>
            <label className={filter["applied"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["applied"]} value={"applied"} onChange={handleChange}/>Applied</label>
            <label className={filter["phoneScreen"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["phoneScreen"]} value={"phoneScreen"} onChange={handleChange}/>Phone Screen</label>
            <label className={filter["codingChallenge"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["codingChallenge"]} value={"codingChallenge"} onChange={handleChange}/>Coding Challenge</label>
            <label className={filter["techScreen"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["techScreen"]} value={"techScreen"} onChange={handleChange}/>Tech Screen</label>
            <label className={filter["onsite"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["onsite"]} value={"onsite"} onChange={handleChange}/>Onsite</label>
            <label className={filter["offer"] ? "selected" : "hidden"}><input type="checkbox"  checked={filter["offer"]} value={"offer"} onChange={handleChange}/>Offer</label>
        </form>
    )
}
