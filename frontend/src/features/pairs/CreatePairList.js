import React, { useState } from 'react';
import { createPairList } from './pairsSlice'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import "./CreatePairList.css";


export default function CreatePairList() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(createPairList({
            title, 
            body
        }))
        history.push("/pairs");
    }

    return (
      <div className="adminContainer">
        <h1>Create List</h1>
        <form onSubmit={handleSubmit}  className={"createPairList"}>
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
          <button>Create Pair List</button>
        </form>
      </div>
    );
};
