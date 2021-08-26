import React from "react";
import styles from "./index.module.css";
import userContext from "../../context/userContext";
import logoIcon from "./pet-parade-logo.png";

export default function Header() {
    return (
        <userContext.Consumer>
          {
            ({ isLoggedIn, logout }) => {
              return (
                <header className={styles.container}>
                  <img src={logoIcon} alt="site-logo" className={styles.logo} />
                  <h1 className={styles.heading}>Pet Parade</h1>
                </header>
              )
            }
          }
        </userContext.Consumer>
      )
}

