import React from "react";
import styles from "./index.module.css";
import Pet from "../Pet";

export default function Home() {

  return (
    <div className={styles.container}>
      <Pet />
    </div>
  )
}
