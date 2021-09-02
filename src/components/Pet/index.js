import React from "react";
import styles from "./index.module.css";
import blankProfile from "./blank-profile.png";

export default function Pet() {

  return (
    <div className={styles.container}>
      <img src={blankProfile} alt="blank-profile.png" className={styles.profileImage} />
      
      <div className={styles.info}>
        <h2 className={styles.name}>Pet's Name</h2>
        
        <span className={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam nesciunt consectetur numquam eos, 
          deleniti vel asperiores.
        </span>
        
        <div className={styles.statContainer}>
          <span className={styles.stat}>🎂 4/29 </span>
          <span className={styles.stat}>❤️ 255</span>
          <span className={styles.stat}>⚔️ 547</span>
          <span className={styles.stat}>🏆 389</span>
        </div>
      </div>

    </div>
  )
}