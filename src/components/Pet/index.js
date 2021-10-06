import React, {useState} from "react";
import PetRatingForm from "../PetRatingForm";
import styles from "./index.module.css";
import blankProfile from "./blank-profile.png";
import heartEmpty from "./heart-empty.png";

export default function Pet({user, pet}) {
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false);

  const handleRateClick = () => setIsRatingFormVisible(!isRatingFormVisible)

  const handleLikeClick = () => {

  }

  /**
   * Conditional rendering of rating button, gates the rating form from unintended use cases.
   */
  const renderRatingButton = () => {
    // user is not logged in
    if (user === null) return;

    // user is the owner of this pet
    if (user.id === pet.owner) return;

    // user has already rated this pet
    let isRated = false;
    for (let rating of user.ratings) {
      if (rating.ratedPet === pet.id) {
        isRated = true;
        break;
      }
    }
    if (isRated) return;

    // passed all gates, show the button
    return <button onClick={handleRateClick} className={styles.buttonRate}>⭐</button>
  }

  return (
    <div className={styles.container}>

      <div className={styles.imageContainer}>
        <img src={blankProfile} alt="blank-profile.png" className={styles.profileImage} />
        {
          user !== null &&
            <button onClick={handleLikeClick} className={styles.buttonLike}>
              <img src={heartEmpty} className={styles.icon} alt="like-heart.png" />
            </button>
        }
      </div>
      
      <div className={styles.info}>
        <header className={styles.header}>
          <h2 className={styles.name}>{pet.name}</h2>
          {renderRatingButton()}
          {
            isRatingFormVisible &&
              <PetRatingForm user={user} pet={pet} petImage={blankProfile} handleClick={handleRateClick} />
          }
        </header>
        
        <span className={styles.bio}>
          {pet.bio}
        </span>
        
        <div className={styles.statContainer}>
          {
            pet.birthday !== null && <span className={styles.stat}>🎂 {pet.birthday}</span>
          }
          <span className={styles.stat}>
            ❤️ {pet.stats.likes}
          </span>
          {pet.stats.rating !== null && <span className={styles.stat}>⭐ {pet.stats.rating}</span>}
        </div>
      </div>

    </div>
  )
}