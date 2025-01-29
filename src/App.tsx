import React from "react";
import { Route, Routes } from "react-router";
import Home from "./route/Home.tsx";
import Top from "./route/Top";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Top />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
};

export default App;