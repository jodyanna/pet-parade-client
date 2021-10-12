import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import Pet from "../Pet";
import SpeciesSelectInput from "../SpeciesSelectInput";

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

  const renderResults = () => {
    // There are no results
    if (results.length < 1) return <p className={styles.noResults}>No results</p>

    // User is not logged in, return every pet possible
    if (user === null) return results.map(pet => <Pet key={pet.id} pet={pet} user={user} />)

    // User is logged in, filter out pets that user owns, DO NOT mutate results array
    const temp = [];
    for (const pet of results) {
      // user pets list does not contain this pet, thus they do not own this pet
      if (!user.pets.includes(pet.id)) {
        temp.push(<Pet key={pet.id} pet={pet} user={user}/>);
      }
    }
    // the temp results array is empty
    if (temp.length < 1) return <p className={styles.noResults}>No results</p>
    else return temp
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <SpeciesSelectInput species={species}
                            setSpecies={setSpecies}
                            hasAny={true}
        />

        <input type="submit" value="Search" className={styles.submit} />
      </form>

      <div className={styles.display}>
        {renderResults()}
      </div>
      
    </div>
  )
}
