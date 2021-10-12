import React, {useState} from "react";
import styles from "./index.module.css";
import SpeciesSelectInput from "../SpeciesSelectInput";

export default function Admin() {
  const [species, setSpecies] = useState("");

  return (
    <div>
      <form>
        <SpeciesSelectInput species={species}
                            setSpecies={setSpecies}
                            hasAny={false}

        />

      </form>


    </div>
  )
}