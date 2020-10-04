import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreatePairList.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePairList, fetchPairList } from "./pairsSlice";

export default function EditPairList() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const pair = useSelector((state) => state.pairs[id]);


  useEffect(() => {
    dispatch(fetchPairList(id));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePairList({
        title,
        body,
      })
    );
    history.push(`/pairs/view/${id}`);
  };

  if(!pair) return null;

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
        <button>Update Pair List</button>
      </form>
    </div>
  );
}
