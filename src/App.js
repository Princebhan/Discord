import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Header /> } />
        <Route exact path="/channels" element={<Home /> } />
        <Route exact path="/channels/:id" element={<Home /> } />
      
       
      </Routes>
    </div>
  );
}

export default App;
