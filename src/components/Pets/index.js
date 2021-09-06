import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import Pet from "../Pet";

const pet1 = {
  name: "Gus",
  bio: "Itchy dog that loves scratching! He does it a little too much though.",
  birthday: "",
  likes: 255,
  matches: 547,
  wins: 389
}

const pet2 = {
  name: "Tag",
  bio: "Old dog that can't see very well. Loves barking at nothing in the early hours of the morning.",
  birthday: "4/29",
  likes: 9,
  matches: 15,
  wins: 2
}

export default function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setPets([pet1, pet2]);
  }, []);

  return (
    <div className={styles.container}>
      {pets.map(pet => <Pet pet={pet} />)}
    </div>
  )
}
