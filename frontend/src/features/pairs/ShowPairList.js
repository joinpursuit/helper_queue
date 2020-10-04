import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DisplayAllPairDays from './DisplayAllPairDays';
import { fetchPairList } from './pairsSlice';

export default function ShowPairList() {
    const [days, setDays] = useState([]);
    const { id } = useParams();
    const pair = useSelector((state) => state.pairs[id])

    const dispatch = useDispatch()

    useEffect(() => {
        if(!pair) {
            dispatch(fetchPairList(id));
        }
    }, [id])


     const createDays = (items) => {
       items = items.split("\n");
       if (items.length % 2) items.push(null);

       let groups = [];

       let n = items.length;
       let inifinityPoint = items[0];

       let candidates = items.slice(1);

       for (let i = 0; i <= n - 2; i++) {
         let group = [];
         group.push([inifinityPoint, candidates[i]]);

         for (let j = 1; j <= n / 2 - 1; j++) {
           let k = i + j;
           if (k > candidates.length - 1) {
             k = k % candidates.length;
           }
           let q = i - j;
           q = q < 0 ? q + candidates.length : q;
           let currentPair = [candidates[k], candidates[q]];
           group.push(currentPair);
         }

         groups.push(group);
       }

       setDays(groups);
     };



    useEffect(() => {
        if(pair) {
            createDays(pair.body);
        }
    }, [pair]);


    if(!pair) return null; 

   


    return (
      <div className="adminContainer">
        <h1>{pair.title + " List"}</h1>
        <DisplayAllPairDays days={days} />
      </div>
    );
};
