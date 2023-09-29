import React from 'react'
import { itemStateContext } from './Context'
import { useState } from 'react'
import { useContext } from 'react'
import Axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Edit = () => {

  const {post} = useContext(itemStateContext);
  const [title,setTitle] = useState(post.title)
  const [note,setNote] = useState(post.note);

  const updateSubmit = (id) => {
    const noteObj = {
      title: title,
      note: note,
    };
    Axios.put(`http://localhost:4000/update/${id}`, noteObj).then(() => {
      alert("Updated");
    });
  };

  return (
    <>
       <div className='container'>
       <form>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Note
            </label>
            <ReactQuill theme="snow" value={note} onChange={setNote} />
          </div>
          <button className="btn btn-warning" type="submit" onClick={() => updateSubmit(post._id)}>
            Submit
          </button>
        </form>
       </div>
    </>
   
  )
}

export default Edit