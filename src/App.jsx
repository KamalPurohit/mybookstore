import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Shelf from "./screens/Shelf";

function App() {
  useEffect(() => {
    if (!window.localStorage.getItem("shelfbooks")) {
      window.localStorage.setItem("shelfbooks",JSON.parse("[]"))
    }
  }, []);
  return (
    <div className="w-full bg-primary text-white font-poppins  min-h-[100vh]">
      <Navbar/>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/shelf" element={<Shelf/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
