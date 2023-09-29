import React , { useState } from 'react';
import Navbar from './components/Navbar';
import {Route,Routes} from 'react-router-dom';
import Create from './components/Create';
import Notes from './components/Notes';
import Edit from './components/Edit';
import {itemStateContext} from './components/Context';

function App() {

const [post,setPost] = useState([]);

  return (
    <>
    <itemStateContext.Provider value={{post,setPost}}>
      <Navbar/>

      <Routes>
        <Route path='Create' element={<Create/>}/>
        <Route path='Notes' element={<Notes/>}/>
        <Route path='Edit' element={<Edit/>}/>
      </Routes>
      </itemStateContext.Provider>
    </>
  );
}

export default App;
