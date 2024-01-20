import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Route";

const materialTheme = createTheme(/* your theme */);
function App() {
  return (
<ThemeProvider theme={materialTheme}>
    <Router>
      <Suspense>
        <Routes />
      </Suspense>
    </Router>
    </ThemeProvider>
  );
}

export default App;
