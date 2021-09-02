import React, {useState} from "react";
import styles from "./index.module.css";
import userContext from "../../context/userContext";
import UserProfile from "../UserProfile";
import UserStats from "../UserStats";
import Pet from "../Pet";

export default function User() {
  const [isStatsVisible, setIsStatsVisible] = useState(true);
  const [isPetsVisible, setIsPetsVisible] = useState(false)

  const handleStatsClick = () => {
    setIsPetsVisible(false);
    setIsStatsVisible(true);
  }
  const handlePetsClick = () => {
    setIsPetsVisible(true);
    setIsStatsVisible(false);
  }

  return (
    <userContext.Consumer>
      {
        ({ user, login }) => {
          return (
            <div className={styles.container}>
              <UserProfile user={user} />

              <div className={styles.displayContainer}>
                <nav className={styles.userNav}>
                  <button onClick={handleStatsClick} className={isStatsVisible ? styles.userNavItemSelected : styles.userNavItem}>
                    My Stats
                  </button>
                  <button onClick={handlePetsClick} className={isPetsVisible ? styles.userNavItemSelected : styles.userNavItem}>
                    My Pets
                  </button>
                </nav>

                <div className={styles.display}>
                  {isStatsVisible && <UserStats />}
                  {isPetsVisible && <Pet />}

                </div>
              </div>
            </div>
          )
        }
      }
    </userContext.Consumer>
  )
}