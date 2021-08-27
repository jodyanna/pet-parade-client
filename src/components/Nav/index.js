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
        <Link to="/login" className={styles.navBarItem}>Login</Link>
        <Link to="/signup" className={styles.navBarItem}>Signup</Link>
      </nav>

      <nav className={styles.navMobile}>
        {
          isMenuVisible ?
          <div className={styles.navMenu}>
            <div className={styles.menuCancelButtonContainer}>
              <button onClick={handleClick} className={styles.navButton}>
                <img src={cancelIcon} alt="x-icon" style={{width: "36px"}}/>
              </button>
            </div>
            <Link to="/login" className={styles.navMenuItem}>Login</Link>
            <Link to="/signup" className={styles.navMenuItem}>Signup</Link>
          </div>
          :
          <button onClick={handleClick} className={styles.navButton}>
            <img src={stackIcon} alt="stack-icon" style={{width: "36px"}}/>
          </button>
        }

      </nav>

    </div>
  )
}