import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.css";
import stackIcon from "./stack-icon.png";
import cancelIcon from "./x-icon.png";

export default function Nav() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClick = () => setIsMenuVisible(!isMenuVisible);
  
  return(
    <div className={styles.container}>

      <nav className={styles.navBar}>
        <Link to="/" className={styles.navBarItem}>Home</Link>
        <Link to="/leaderboard" className={styles.navBarItem}>Leaderboard</Link>
        <Link to="/user" className={styles.navBarItem}>My Profile</Link>
        <Link to="/login" className={styles.navBarItem}>Log in</Link>
        <Link to="/signup" className={styles.navBarItem}>Sign up</Link>
      </nav>

      <div className={styles.navMobile}>
        {
          isMenuVisible ?
          <nav className={styles.navMenu}>
            <div className={styles.menuCancelButtonContainer}>
              <button onClick={handleClick} className={styles.navButton}>
                <img src={cancelIcon} alt="x-icon" style={{width: "36px"}}/>
              </button>
            </div>
            <Link to="/" className={styles.navMenuItem}>Home</Link>
            <Link to="/leaderboard" className={styles.navMenuItem}>Leaderboard</Link>
            <Link to="/user" className={styles.navMenuItem}>My Profile</Link>
            <Link to="/login" className={styles.navMenuItem}>Log in</Link>
            <Link to="/signup" className={styles.navMenuItem}>Sign up</Link>
          </nav>
          :
          <button onClick={handleClick} className={styles.navButton}>
            <img src={stackIcon} alt="stack-icon" style={{width: "36px"}}/>
          </button>
        }
      </div>

    </div>
  )
}