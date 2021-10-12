import React from "react";
import styles from "./index.module.css";
import SpeciesUpdateForm from "../SpeciesUpdateForm";
import SpeciesForm from "../SpeciesForm";

export default function Admin({user}) {

  return (
    <div className={styles.container}>
      <SpeciesForm user={user} />
      <SpeciesUpdateForm user={user} />
    </div>
  )
}