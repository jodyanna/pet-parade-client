import React, {useState} from "react";
import styles from "./index.module.css";
import errorIcon from "./error-icon.png";
import DatePicker from "react-date-picker";
import SpeciesSelectInput from "../SpeciesSelectInput";

export default function PetForm({user, login, pet, handleClick}) {
  const [petName, setPetName] = useState(pet === undefined ? "" : pet.name);
  const [bio, setBio] = useState(pet === undefined ? "" : pet.bio);
  const [birthday, setBirthday] = useState(pet === undefined ? null : pet.birthday);
  const [species, setSpecies] = useState(pet === undefined ? "" : pet.species);
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

  const handlePetNameChange = e => setPetName(e.target.value)
  const handleBioChange = e => setBio(e.target.value)

  const handleSubmit = e => {
    e.preventDefault();

    validateForm()
      .then(isValid => {
        if (isValid) {
          const data = {
            id: pet === undefined ? null : pet.id,
            owner: user.id,
            name: petName,
            bio: bio,
            birthday: birthday,
            species: parseInt(species),
            isFlagged: false
          }

          fetch("http://localhost:8080/pets", {
            method: pet === undefined ? "POST" : "PUT",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
              "authorization": "Bearer " + user.token.jwt
            }
          }).then(res => res.json())
            .then(res => {
              if (pet === undefined) {
                user.pets.push(res.id);
                user.stats.petCount += 1;
                login(user);
              } else {
                pet = res;
              }
              window.location.reload();
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
          <h2 className={styles.heading}>
            {pet === undefined ? "Create pet" : "Edit " + pet.name}
          </h2>
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
          <SpeciesSelectInput species={species}
                              setSpecies={setSpecies}
                              hasAny={false}
                              alignRight={true}
          />
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