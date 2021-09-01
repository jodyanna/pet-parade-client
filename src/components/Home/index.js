import React from "react";
import Header from "../Header";
import User from "../User";
import styles from "./index.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <Header />
      <User />
    </div>
  )
}
