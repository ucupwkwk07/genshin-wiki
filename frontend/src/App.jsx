import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetail";
import CreateCharacter from "./pages/CreateCharacter";
import Weapons from "./pages/Weapons";
import WeaponDetails from "./pages/WeaponDetail";
import CreateWeapon from "./pages/CreateWeapon";
import Artifacts from "./pages/Artifacts";
import ArtifactDetails from "./pages/ArtifactDetail";
import CreateArtifact from "./pages/CreateArtifact";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/characters/create" element={<CreateCharacter/>} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/weapons/:id" element={<WeaponDetails />} />
          <Route path="/weapons/create" element={<CreateWeapon/>} />
          <Route path="/artifacts" element={<Artifacts />} />
          <Route path="/artifacts/:id" element={<ArtifactDetails />} />
          <Route path="/artifacts/create" element={<CreateArtifact/>} />
        </Routes>
        <div className="width:full">
        <Footer/>
        </div>
      </div> 
    </div>
  );
};

export default App;