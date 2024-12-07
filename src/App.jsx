import { useState } from "react";
import "./App.css";
import { allCharacters, character } from "../data/data.js";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";



export default function App() {
  const [Characters, setCharacters] = useState(allCharacters);

  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={Characters.length}/>
      </Navbar>
      <Main characters={Characters}>
        <CharacterList Characters={Characters} />
        <CharacterDetails />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
