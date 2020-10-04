import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreatePairList.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePairList, fetchPairList } from "./pairsSlice";

export default function EditPairList() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [currentDay, setCurrentDay] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const pair = useSelector((state) => state.pairs[id]);



  useEffect(() => {
    dispatch(fetchPairList(id)).then(fetchedPair => {
        setTitle(fetchedPair.title);
        setBody(fetchedPair.body);
        setCurrentDay(fetchedPair.current_day + 1)
        setIsLoading(false);
    })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePairList({
        title,
        body,
        id, 
        current_day: currentDay - 1,
      })
    );
    history.push(`/pairs/view/${id}`);
  };

  if(!pair) return null;
  if(isLoading) return <div>Loading</div>

  return (
    <div className="adminContainer">
      <h1>Edit List</h1>
      <form onSubmit={handleSubmit} className={"createPairList"}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Title of List"}
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={"Enter each name on a new line"}
          required
        />
        <input
          value={currentDay}
          onChange={(e) => setCurrentDay(e.target.value)}
          placeholder={"Current Day"}
          required
          type="number"
          min="1"
          max={`${
            body.split("\n").length % 2
              ? body.split("\n").length
              : body.split("\n").length - 1
          }`}
        />
        <button>Update Pair List</button>
      </form>
    </div>
  );
}
