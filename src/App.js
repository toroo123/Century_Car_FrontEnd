import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./components/pages/Login";
import SignupPage from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import MainLayout from "./components/MainLayout";
import Guide from "./components/pages/Guide";
import About from "./components/pages/About";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>} />
          <Route path="/login" element={<MainLayout><LoginPage/></MainLayout>} />
          <Route path="/signup" element={ <MainLayout><SignupPage/></MainLayout>} />
          <Route path="/guide" element={<MainLayout><Guide/></MainLayout>}/>
          <Route path="/about" element={<MainLayout><About/></MainLayout>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App; 