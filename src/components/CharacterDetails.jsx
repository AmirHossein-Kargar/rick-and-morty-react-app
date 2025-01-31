import {
  ArrowUpCircleIcon,
  CheckBadgeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

export default function CharacterDetails({
  selectedId,
  onAddFavorites,
  isAddedToFavorites,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        // ? Flattening the array using flat() method.
        setEpisodes([episodeData].flat().slice(0, 4));
        setCharacter(data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: "1" }}>
        <Loader />
      </div>
    );
  }

  if (!character || !selectedId)
    return (
      <h2 style={{ color: "var(--slate-300)", margin: "0 auto" }}>
        Please Select A Character
      </h2>
    );

  return (
    <div>
      <CharacterSubInfo
        character={character}
        isAddedToFavorites={isAddedToFavorites}
        onAddFavorites={onAddFavorites}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

function CharacterSubInfo({ character, isAddedToFavorites, onAddFavorites }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👦🏼" : "🙍🏼‍♀️"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp; {character.status}</span>
          <span>&nbsp;- {character.species}</span>
        </div>
        <div className="location">
          <p>Last Known Location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddedToFavorites ? (
            <p>
              Already Added <CheckIcon className="checkicon" />
            </p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavorites(character)}
            >
              Add To Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    )
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    )
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List Of Episodes:</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{rotate: sortBy ? "0deg" : "180deg"}} />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => {
          return (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, 0)} - {item.episode} :{" "}
                <strong>{item.name}</strong>
              </div>
              <div className="date badge badge--secondary">{item.air_date}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
