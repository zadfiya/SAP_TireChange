import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Route";
import DayScheduler from "./components/DayScheduler/DayScheduler";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HelmetProvider } from "react-helmet-async";

const materialTheme = createTheme(/* your theme */);
function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HelmetProvider context={{}}>
        <Router>
          <Suspense>
            <Routes />
            {/* <DayScheduler /> */}
          </Suspense>
        </Router>
        </HelmetProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
