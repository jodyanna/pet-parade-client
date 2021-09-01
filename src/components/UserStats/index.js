import React from "react";
import styles from "./index.module.css";

export default function UserStats() {
  return (
    <div>
      <div className={styles.row}>
        Pets<span className={styles.field}>3</span>
      </div>

      <div className={styles.row}>
        Pet Likes Recieved<span className={styles.field}>122</span>
      </div>

      <div className={styles.row}>
        Pet Likes Given<span className={styles.field}>34</span>
      </div>

      <div className={styles.row}>
        Votes Given<span className={styles.field}>45</span>
      </div>

      <div className={styles.row}>
        Votes Recieved<span className={styles.field}>224</span>
      </div>

    </div>
  )
}