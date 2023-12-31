import React, { useState } from "react";
import Axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from '../help/helper';

const Create = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const noteObj = {
      title: title,
      note: note,
    };

    Axios.post(`${BASE_URL}/newNote`, noteObj).then(() => {
      alert("Created");
    });
  };

  return (
    <>
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Note
            </label>
            <ReactQuill theme="snow" value={note} onChange={setNote} />
          </div>
          <button className="btn btn-warning" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
