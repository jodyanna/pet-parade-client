import React from "react";
import styles from "./index.module.css";
import blankProfile from "./blank-profile.png";

export default function Pet({pet}) {

  return (
    <div className={styles.container}>
      <img src={blankProfile} alt="blank-profile.png" className={styles.profileImage} />
      
      <div className={styles.info}>
        <h2 className={styles.name}>{pet.name}</h2>
        
        <span className={styles.bio}>
          {pet.bio}
        </span>
        
        <div className={styles.statContainer}>
          {
            pet.birthday === null ? "" : <span className={styles.stat}>🎂 {pet.birthday}</span>
          }
          <span className={styles.stat}>❤️ {pet.likes}</span>
          <span className={styles.stat}>📈 {pet.ratingAvg}</span>
          <span className={styles.stat}>🐾 {pet.ratingsCount}</span>
        </div>
      </div>

    </div>
  )
}