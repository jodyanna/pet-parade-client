import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import userContext from "../../context/userContext";
import UserProfile from "../UserProfile";

export default function User() {



  return (
    <userContext.Consumer>
      {
        ({ user }) => {
          return (
            <div className={styles.container}>
              <UserProfile user={user} />

              <div className={styles.display}>
                <nav className={styles.userNav}>
                  <button className={styles.userNavItem}>My Stats</button>
                  <button className={styles.userNavItem}>My Pets</button>
                </nav>
              </div>
            </div>
          )
        }
      }
    </userContext.Consumer>
  )
}