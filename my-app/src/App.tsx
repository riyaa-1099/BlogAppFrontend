import React from "react";
import "./App.css";
import Allrouter from "./pages/Allrouter";
import Navbar from "./pages/Navbar/navbar";


const App: React.FC = () => {
 
  return (
    <div className="App">
    <Navbar />
    <Allrouter />
  </div>
    

  );
};

export default App;