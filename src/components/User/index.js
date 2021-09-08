import React, {useState} from "react";
import styles from "./index.module.css";
import UserProfile from "../UserProfile";
import UserStats from "../UserStats";
import Pets from "../Pets";

export default function User({user, login}) {
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
    <div className={styles.container}>
      <UserProfile user={user} login={login} />

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
          {isStatsVisible && <UserStats user={user} />}
          {isPetsVisible && <Pets user={user} />}
        </div>
      </div>
    </div>
  )
}