import "./App.css";
import Button from "./components/Button";
import { people } from "./assets/data.js";
import { getImageUrl } from "./assets/utils.js";

export default function App() {
  const listItems = people.map((person) => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {` ${person.profession} known for ${person.accomplishment}`}
      </p>
    </li>
  ));

  return (
    <div className="App">
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </div>
  );
}
