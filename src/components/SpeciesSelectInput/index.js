import React, {useState ,useEffect} from "react";
import styles from "./index.module.css";

export default function SpeciesSelectInput({species, setSpecies, hasAny, wrapperStyle=styles.speciesSelect}) {
  const [allSpecies, setAllSpecies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/species", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json())
      .then(res => setAllSpecies(res))
      .catch(error => console.log(error));
  }, []);

  const handleSpeciesChange = e => setSpecies(e.target.value)

  return (
    <div className={wrapperStyle}>
      <label>Species</label>
      <select name="species"
              className={styles.selectInput}
              value={species}
              onChange={handleSpeciesChange}
      >
        <option value={hasAny ? 0 : ""}>{hasAny ? "ANY" : "SELECT"}</option>
        {
          allSpecies.map(species => <option key={species.id} value={species.id}>{species.name}</option>)
        }
      </select>
    </div>
  )
}