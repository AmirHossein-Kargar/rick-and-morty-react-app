import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

import { allCharacters } from "../data/data";

export default function App(){
  return <div className="app">
    <Navbar />
    <div className="main">
      <CharacterList Characters={allCharacters}/>
      <CharacterDetails/>
    </div>
  </div>
}