import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

export const API_URL = "http://localhost:3001/api/users";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch data");
    };

    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<p>Page not Found!</p>} />
      </Routes>
    </>
  );
};

export default App;
