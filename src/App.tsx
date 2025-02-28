import React from "react";
import { Route, Routes } from "react-router";
import Home from "./route/Home.tsx";
import Top from "./route/Top";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // MUI のデフォルトの青色
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Top />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
