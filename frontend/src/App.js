import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Route";
import DayScheduler from "./components/DayScheduler/DayScheduler";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const materialTheme = createTheme(/* your theme */);
function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Suspense>
            <Routes />
            {/* <DayScheduler /> */}
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
