import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import parse from "html-react-parser";
import {itemStateContext} from './Context';
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { BASE_URL } from '../help/helper';

const Notes = () => {
  const [items, setItems] = useState([]);
  const {setPost} = useContext(itemStateContext);
  

  useEffect(() => {
    Axios.get(`${BASE_URL}/notes`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  function deleteNote(id) {
    Axios.delete(`${BASE_URL}/deleteNote/${id}`).then(() => {
      window.location.reload(false);
    });
  }

  return (
    <>
      <div className="container">
        {items.map((element) => {
          return (
            <div className="card my-3">
              <div className="card-body">
                <h2 className="card-title">{element.title}</h2>
                <p>{parse(element.note)}</p>

                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteNote(element._id)}
                  >
                    Delete
                  </button>
                  <Link to='/Edit'>
                  <button type="button" class="btn btn-primary" onClick={() => setPost(element)}>
                    Edit
                  </button>
                  </Link>
                 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
