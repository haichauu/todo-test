import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {appRoutes.map((route) => (
              <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
              />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
