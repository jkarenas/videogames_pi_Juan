import {Route,Routes, BrowserRouter} from "react-router-dom"
import React from 'react';
import Home from "./views/home/home"
import Detail from "./views/detail/detail"
import Create from "./views/create/create"
import "./app.css"
import LandingPage from "./views/landingPage/landingPage";

//importante si es necesario usar exact path
function App() {
  return (
  <BrowserRouter>
     <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
     </Routes>

    </BrowserRouter>
  );
}

export default App;