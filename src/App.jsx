import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import Loader from "./components/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Search } from "./components/Navbar";
import { Heart } from "./components/Navbar";
import useCharacters from "./hooks/useCharacters.js";
import useLocalStorage from "./hooks/useLocalStorage.js";

export default function App() {
  const [query, setQuery] = useState("");
  const { isLoading, Characters } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("FAVORITES", [])

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
