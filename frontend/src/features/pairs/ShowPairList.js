import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import DisplayAllPairDays from "./DisplayAllPairDays";
import DisplaySingleDay from "./DisplaySingleDay";
import { fetchPairList, deletePairList, updatePairList } from "./pairsSlice";

export default function ShowPairList() {
  const [days, setDays] = useState([]);
  const [showSingleDay, setShowSingleDay] = useState(true)
  const { id } = useParams();
  const history = useHistory();
  const pair = useSelector((state) => state.pairs[id]);

  const dispatch = useDispatch();

  const changeDay = (day) => {
    if (day >= days.length) {
      day = day % days.length;
    } else if (day < 0) {
      day = days.length - 1;
    }
    const {title, body, id} = pair;
    dispatch(
        updatePairList({
        title,
        body,
        id,
        current_day: day,
        })
    );
  };

  useEffect(() => {
    if (!pair) {
      dispatch(fetchPairList(id));
    }
  }, [id]);

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
    if (pair) {
      createDays(pair.body);
    }
  }, [pair]);

  const deleteList = async () => {
    let shouldDelete = await window.confirm(
      "Deleting this list is permanent action."
    );
    if (shouldDelete) {
      dispatch(deletePairList(id));
      history.push("/pairs");
    }
  };

  if (!pair) return null;

  return (
    <div className="adminContainer">
      <h1>{pair.title + " List"}</h1>
      <button onClick={() => history.push(`/pairs/edit/${id}`)}>
        Edit List
      </button>
      <button onClick={deleteList}>Delete List</button>
      <button onClick={() => setShowSingleDay(prevDay => !prevDay)}>
         {showSingleDay ? "Show All Days" : "Show Current Day"}
      </button>
      {showSingleDay ? 
      <DisplaySingleDay
        day={days[pair.current_day]}
        currentDay={pair.current_day}
        totalDays={days.length}
        changeDay={changeDay}
      /> :
      <DisplayAllPairDays days={days} />
      }
    </div>
  );
}
