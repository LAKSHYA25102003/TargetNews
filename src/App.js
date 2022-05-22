import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';


class App extends Component{


  

  render()
  {
    return(
      <Router>
        <div>
          <Navbar/>
          <Routes>

            {/* here news is already mounted so page will not change data only end point change for force fully remounting we will use key prop with unique key .. with the help of key react understand that it is new component */}
            <Route exact path="/" element={<News key="general" pageSize={6} category={"general"}/>}/> 
            <Route exact path="/business" element={<News key="business" pageSize={6} category={"business"}/>}/> 
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} category={"entertainment"}/>}/> 
            <Route exact path="/health" element={<News key="health" pageSize={6} category={"health"}/>} /> 
            <Route exact path="/science" element={<News key="science" pageSize={6} category={"science"}/>}/> 
            <Route exact path="/sports" element={<News key="sports" pageSize={6} category={"sports"}/>}/> 
            <Route exact path="/technology" element={<News key="technology" pageSize={6} category={"technology"}/>}/> 
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;


