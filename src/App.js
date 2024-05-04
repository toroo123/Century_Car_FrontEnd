import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import Home from "./pages/Home";
import MainLayout from "./MainLayout";
import Guide from "./pages/Guide";
import About from "./pages/About";
import Favorite from "./pages/Favorite";


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
          <Route path="/favorite" element={<MainLayout><Favorite/></MainLayout>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;