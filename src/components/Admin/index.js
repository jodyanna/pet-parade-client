import React, {useState} from "react";
import styles from "./index.module.css";
import SpeciesUpdateForm from "../SpeciesUpdateForm";
import SpeciesForm from "../SpeciesForm";

export default function Admin({user}) {
  const [isDbEditorVisible, setIsDbEditorVisible] = useState(true);
  const [isContentManagerVisible, setIsContentManagerVisible] = useState(false);

  const handleDbEditorClick = () => {
    setIsDbEditorVisible(true);
    setIsContentManagerVisible(false);
  }

  const handleContentManagerClick = () => {
    setIsContentManagerVisible(true);
    setIsDbEditorVisible(false);
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button onClick={handleDbEditorClick} className={isDbEditorVisible ? styles.navItemSelected : styles.navItem}>
          Database Editor
        </button>

        <button onClick={handleContentManagerClick} className={isContentManagerVisible ? styles.navItemSelected : styles.navItem}>
          Content Manager
        </button>
      </nav>

      <div className={styles.display}>
        {
          isDbEditorVisible &&
            <div className={styles.dbEditor}>
              <SpeciesForm user={user} />
              <SpeciesUpdateForm user={user} />
            </div>
        }

      </div>

    </div>
  )
}