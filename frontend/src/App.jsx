import { useState } from "react";
import BookSearch from "./components/BookSearch/BookSearch.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import Homepage from "./pages/Homepage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login/Login.jsx";
import MainNav from "./components/MainNav/MainNav.jsx";
import About from "./components/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNav></MainNav>
      <div id="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/book-search" element={<BookSearch />} />
        </Routes>
      </div>

      <Footer></Footer>
    </Router>
  );
};

export default App;
