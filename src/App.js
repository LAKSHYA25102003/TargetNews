import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React, { Component,useState,useEffect } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';


const App=()=>{
  // constructor() {
  //   super();
  //   this.state = {
  //     progress: 10
  //   }
  // }
  const [progress,SetProgress]=useState(10);


  const setProgress = (nprogress) => {
    SetProgress(nprogress);
  }
    return (
      <Router>
        <div>
          <LoadingBar
            color='red'
            height={3}
            progress={progress}
          />
          <Navbar />
          <Routes>

            {/* here News setProgress={setProgress}  is already mounted so page will not change data only end point change for force fully remounting we will use key prop with unique key .. with the help of key react understand that it is new component */}
            <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={6} category={"general"} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={6} category={"business"} />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={6} category={"entertainment"} />} />
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={6} category={"health"} />} />
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={6} category={"science"} />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={6} category={"sports"} />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={6} category={"technology"} />} />
          </Routes>
        </div>
      </Router>
    );
  
}

export default App;


