import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

export default function CharacterList({selectedId , Characters, isLoading, onSelectCharacter }) {
  if(isLoading) {
    return <div className="Characters-list">
      <Loader />
    </div>
  }
  return (
    <div className="Characters-list">
      {Characters.map((item) => (
        <Character key={item.id} selectedId={selectedId} item={item} onSelectCharacter={onSelectCharacter} />
      ))}
    </div>
  );
}

function Character({selectedId, item, onSelectCharacter }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
        {selectedId == item.id ? <EyeSlashIcon/> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👦🏼" : "🙍🏼‍♀️"}</span>
      <span> {item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status} - </span>
      <span>{item.species}</span>
    </div>
  );
}
