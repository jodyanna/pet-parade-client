import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import errorIcon from "./error-icon.png";
import DatePicker from "react-date-picker";

export default function PetForm({user, login, handleClick, handleRefresh}) {
  const [petName, setPetName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [species, setSpecies] = useState("");
  const [allSpecies, setAllSpecies] = useState([]);
  const [errors, setErrors] = useState({
    petName: {
      message: "",
      isValid: true
    },
    species: {
      message: "",
      isValid: true
    }
  });

  useEffect(() => {
    fetch("http://localhost:8080/species", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json())
      .then(res => setAllSpecies(res))
      .catch(error => console.log(error));
  }, []);

  const handlePetNameChange = e => setPetName(e.target.value)
  const handleBioChange = e => setBio(e.target.value)
  const handleSpeciesChange = e => setSpecies(e.target.value)

  const handleSubmit = e => {
    e.preventDefault();

    validateForm()
      .then(isValid => {
        if (isValid) {
          const data = {
            owner: user.id,
            name: petName,
            bio: bio,
            birthday: birthday,
            species: parseInt(species),
            isFlagged: false
          }

          fetch("http://localhost:8080/pets", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json"
            }
          }).then(res => res.json())
            .then(res => {
              user.pets.push(res.id);
              login(user);
              handleRefresh();
              handleClick();
            })
            .catch(error => console.log(error));
        }
      })

  }

  const validateForm = async () => {
    let errors = {
      petName: {},
      species: {}
    };

    errors.petName = validateTextField(petName);
    errors.species = validateTextField(species);

    setErrors(errors);

    return errors.petName.isValid && errors.species.isValid
  }

  /**
   * Validate a single text input field.
   * @param {string} field
   * @return {{isValid: boolean, message: string}}
   */
   const validateTextField = field => {
    if (field.length < 1) {
      return {
        message: `This field cannot be empty.`,
        isValid: false
      }
    }
    else {
      return {
        message: "",
        isValid: true
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <header className={styles.header}>
          <h2 className={styles.heading}>Create pet</h2>
        </header>

        <div className={styles.textFieldContainer}>
          <label htmlFor="petName" className={styles.textInputLabel}>
            Name
            <p className={styles.errorText}>{errors.petName.message}</p>
          </label>
          <div className={styles.textInputContainer}>
            <input type="text"
                    name="petName"
                    value={petName}
                    className={errors.petName.isValid ? styles.textInput : styles.textInputError}
                    onChange={handlePetNameChange}
            />
            {
              !errors.petName.isValid &&
              <img src={errorIcon} alt="warning-icon" className={styles.errorIcon} />
            }
          </div>
        </div>

        <div className={styles.textFieldContainer}>
          <label htmlFor="bio" className={styles.textareaInputLabel}>
            Bio
          </label>
          <div className={styles.textareaInputContainer}>
            <textarea name="bio"
                      value={bio}
                      className={styles.textareaInput}
                      onChange={handleBioChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.dateLabel}>Birthday</label>
          <DatePicker value={birthday} onChange={setBirthday} className={styles.datePicker} />
        </div>

        <div className={errors.species.isValid ? styles.fieldContainer : styles.fieldError}>
          <label className={styles.dateLabel}>Species</label>
          <select name="species"
                  className={styles.selectInput}
                  value={species}
                  onChange={handleSpeciesChange}
          >
            <option value={""}>Select species</option>
            {
              allSpecies.map(species => <option key={species.id} value={species.id}>{species.name}</option>)
            }
          </select>
        </div>

        <div className={styles.buttonContainer}>
          <input type="submit" value="Submit" className={styles.button} />
          <button onClick={handleClick} className={styles.button}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}