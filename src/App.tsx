import React from "react";
import { Route, Routes } from "react-router";
import Home from "./route/Home";
import Top from "./route/Top";

const App = () => {
  return (
    <Routes>
      <Route path='/top' element={<Top />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default App;
