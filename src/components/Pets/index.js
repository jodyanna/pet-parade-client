import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import Pet from "../Pet";
import PetForm from "../PetForm";

export default function Pets({user, login}) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleClick = () => setIsFormVisible(!isFormVisible)

  const handleRefresh = () => setRefresh(!refresh)

  useEffect(() => {
    if (user.pets !== null) {
      fetchAllPets(user.pets)
        .then(res => {
          setPets(res);
          setIsLoading(false);
        });
    }
  }, [user.pets, refresh]);

  const fetchAllPets = async ids => {
    const allPets = [];

    for (let i = 0; i < ids.length; i++) {
      const response = await fetch("http://localhost:8080/pets/" + ids[i], {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      }).catch(error => console.log(error));

      const data = await response.json();

      allPets.push(data);
    }

    return Promise.all(allPets);
  }

  return (
    <div className={styles.container}>
      {
        !isLoading && pets.map(pet => <Pet key={pet.id} user={user} pet={pet} />)
      }

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClick}>
          Create new pet
        </button>
      </div>

      {
        isFormVisible && <PetForm user={user}
                                  login={login}
                                  handleClick={handleClick}
                                  handleRefresh={handleRefresh}
        />
      }
    </div>
  )
}
