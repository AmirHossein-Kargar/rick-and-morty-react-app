import { useEffect, useState } from "react";
import "./App.css";
import { allCharacters, character } from "../data/data.js";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import Loader from "./components/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [Characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("Something happened!");

        const data = await res.json();
        setCharacters(data.results.slice(0, 4));
      } catch (error) {
        toast.error(error.message, {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <SearchResult numOfResult={Characters.length} />
      </Navbar>
      <Main characters={Characters}>
        <CharacterList Characters={Characters} isLoading={isLoading} />
        <CharacterDetails />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
