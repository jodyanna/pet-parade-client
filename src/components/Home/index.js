import React from "react";
import {Link} from "react-router-dom";
import Header from "../Header";
import styles from "./index.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <Header />
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </div>
  )
}
