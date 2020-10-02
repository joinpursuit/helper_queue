import React, { useEffect } from 'react';
import { fetchAllPairLists, selectPairLists } from './pairsSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Pairs() {
    const dispatch = useDispatch();

    const pairLists = useSelector(selectPairLists);

    useEffect(() => {
        dispatch(fetchAllPairLists)
    }, [])

    return (
      <div className="adminContainer">
        <h1>Pairs</h1>
      </div>
    );
};
