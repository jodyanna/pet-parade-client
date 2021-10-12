import React, {useState} from "react";
import styles from "./index.module.css";
import SpeciesSelectInput from "../SpeciesSelectInput";

export default function Admin({user}) {
  const [species, setSpecies] = useState("");
  const [changeSpecies, setChangeSpecies] = useState("");

  const handleNewSpeciesNameChange = e => setChangeSpecies(e.target.value)

  const handleDeleteSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:8080/species/update", {
      method: "PUT",
      body: JSON.stringify({
        id: parseInt(species),
        name: changeSpecies.toUpperCase()
      }),
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + user.token.jwt
      }
    }).then(res => res.json())
      .then(() => {
        setSpecies("");
        setChangeSpecies("");
        window.location.reload();
      })
      .catch(error => console.log(error))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleDeleteSubmit} className={styles.changeSpeciesForm}>
        <label>Change species name from</label>
        <SpeciesSelectInput species={species}
                            setSpecies={setSpecies}
                            hasAny={false}
        />
        to
        <input type="text"
               value={changeSpecies}
               onChange={handleNewSpeciesNameChange}
               className={styles.changeSpeciesTextInput}
        />
        <input type="submit" value="Submit" className={styles.submit}/>
      </form>

    </div>
  )
}