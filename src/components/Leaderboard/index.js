import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import Pet from "../Pet";

export default function Leaderboard({user}) {
  const [species, setSpecies] = useState("0");
  const [allSpecies, setAllSpecies] = useState([]);
  const [results, setResults] = useState([]);

  const handleSpeciesChange = e => setSpecies(e.target.value)

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

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      species: parseInt(species)
    };

    fetch("http://localhost:8080/pets/species", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json())
      .then(res => {
        setResults(res)
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.speciesSelect}>
          <label>Species</label>
          <select name="species"
                  className={styles.selectInput}
                  value={species}
                  onChange={handleSpeciesChange}
          >
            <option value={0}>ANY</option>
            {
              allSpecies.map(species => <option key={species.id} value={species.id}>{species.name}</option>)
            }
          </select>
        </div>

        <input type="submit" value="Search" className={styles.submit} />
      </form>

      <div className={styles.display}>
        {
          results.length < 1 ?
            <p className={styles.noResults}>No results</p>
            :
            user === null ?
              results.map(pet => <Pet key={pet.id} pet={pet} user={user} />)
              :
              results.map(pet => {
                if (!user.pets.includes(pet.id)) {
                  return <Pet key={pet.id} pet={pet} user={user}/>;
                } else {
                  return null;
                }
              })
        }
      </div>
      
    </div>
  )
}
