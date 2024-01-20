import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Route";

function App() {
  return (
    <Router>
      <Suspense>
        <Routes />
      </Suspense>
    </Router>
  );
}

export default App;
