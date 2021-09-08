import React, {useState} from "react";
import PetRatingForm from "../PetRatingForm";
import styles from "./index.module.css";
import blankProfile from "./blank-profile.png";
import heartEmpty from "./heart-empty.png";
import heartFilled from "./heart-filled.png";

export default function Pet({user, pet}) {
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false);

  const handleRateClick = () => setIsRatingFormVisible(!isRatingFormVisible)

  const handleLikeClick = () => {

  }

  return (
    <div className={styles.container}>

      <div className={styles.imageContainer}>
        <img src={blankProfile} alt="blank-profile.png" className={styles.profileImage} />
        {
          user.id !== pet.userId &&
            <button onClick={handleLikeClick} className={styles.buttonLike}>
              <img src={heartEmpty} className={styles.icon} alt="like-heart.png" />
            </button>
        }
        {
          isRatingFormVisible && 
            <PetRatingForm user={user} pet={pet} petImage={blankProfile} handleClick={handleRateClick} />
        }
      </div>
      
      <div className={styles.info}>
        <header className={styles.header}>
          <h2 className={styles.name}>{pet.name}</h2>
          {
            user.id !== pet.userId && <button onClick={handleRateClick} className={styles.buttonRate}>⭐</button>
          }
        </header>
        
        <span className={styles.bio}>
          {pet.bio}
        </span>
        
        <div className={styles.statContainer}>
          {
            pet.birthday !== null && <span className={styles.stat}>🎂 {pet.birthday}</span>
          }
          <span className={styles.stat}>❤️ {pet.likes}</span>
          <span className={styles.stat}>⭐ {pet.ratingAvg}</span>
          <span className={styles.stat}>🐾 {pet.ratingsCount}</span>
        </div>
      </div>

    </div>
  )
}