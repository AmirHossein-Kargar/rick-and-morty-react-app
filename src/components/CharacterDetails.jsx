import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { episodes } from "../../data/data";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader"

export default function CharacterDetails({ selectedId }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null)
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
      } catch (error) {
        toast.error(error.response.data.error)
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: "1"}}>
        <Loader/>
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
            <button className="btn btn--primary">Add To Favorite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List Of Episodes:</h2>
          <ArrowUpCircleIcon className="icon" />
        </div>
        <ul>
          {episodes.map((item, index) => {
            return (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, 0)} - {item.episode} :{" "}
                  <strong>{item.name}</strong>
                </div>
                <div className="date badge badge--secondary">
                  {item.air_date}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
