import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Router, Route, Routes } from "react-router-dom";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { HomePost, Home } from "./Components";
import { Communities } from "./Components/Communities/Communities";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { SidebarLayout } from "./Components/SidebarLayout";
import { Interest } from "./Components/InterestPage/Interest";
import { ParticularCommunity } from "./Components/ParticularCommunity/ParticularCommunity";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" Component={Home}></Route>
        </Route>
        <Route path="/interest" Component={Interest}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/register" Component={Register}></Route>
        <Route path="/communities" Component={Communities}></Route>
        <Route
          path="/particularcommunity"
          Component={ParticularCommunity}
        ></Route>
      </Routes>
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
