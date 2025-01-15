import { useEffect, useState } from "react";
import "./App.css";
// import { allCharacters, character } from "../data/data.js";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import Loader from "./components/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Search } from "./components/Navbar";
import { Heart } from "./components/Navbar";
import Modal from "./components/Modal.jsx";

export default function App() {
  const [Characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 4));
      } catch (error) {
        // ! for cancelled REQ
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }

        // toast.error(error.response.data.error, {
        //   className: "custom-toast",
        //   bodyClassName: "custom-toast-body",
        //   theme: "dark",
        // });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleAddFavorite = (char) => {
    setFavorites((prevFav) => [...prevFav, char]);
  };

  // * delete favorite item when user clicked
  const handleDeleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const isAddedToFavorites = favorites
    .map((fav) => fav.id)
    .includes(selectedId);

  return (
    <div className="app">
      <Toaster />

      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={Characters.length} />
        <Heart favorites={favorites} onDeleteFavorite={handleDeleteFavorite} />
      </Navbar>
      <Main characters={Characters}>
        <CharacterList
          selectedId={selectedId}
          Characters={Characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddFavorites={handleAddFavorite}
          isAddedToFavorites={isAddedToFavorites}
        />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
