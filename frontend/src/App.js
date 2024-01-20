import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";

const materialTheme = createTheme(/* your theme */);
function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <div className="App">
        {/* components from another library and Material UI */}

        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
