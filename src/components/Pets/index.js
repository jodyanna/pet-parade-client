import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import Pet from "../Pet";

const pet1 = {
  id: 1,
  userId: 1,
  name: "Gus",
  bio: "Itchy dog that loves scratching! He does it a little too much though.",
  birthday: null,
  likes: 255,
  ratingAvg: 8.3,
  ratingsCount: 389
}

const pet2 = {
  id: 2,
  userId: 2,
  name: "Tag",
  bio: "Old dog that can't see very well. Loves barking at nothing in the early hours of the morning.",
  birthday: "4/29",
  likes: 9,
  ratingAvg: 6.4,
  ratingsCount: 2
}

export default function Pets({user}) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setPets([pet1, pet2]);
  }, []);

  return (
    <div className={styles.container}>
      {pets.map(pet => <Pet user={user} pet={pet} />)}
    </div>
  )
}
