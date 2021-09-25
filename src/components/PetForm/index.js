import React, {useState} from "react";
import styles from "./index.module.css";
import errorIcon from "./error-icon.png";

export default function PetForm({user, handleClick}) {
  const [petName, setPetName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [species, setSpecies] = useState(null);
  const [errors, setErrors] = useState({});

  const handlePetNameChange = e => setPetName(e.target.value)
  const handleBioChange = e => setBio(e.target.value)
  const handleBirthdayChange = e => setBirthday(e.target.value)
  const handleSpeciesChange = e => setSpecies(e.target.value)

  const handleSubmit = e => {
    e.preventDefault();


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
      <form onSubmit={handleSubmit}>

      <div className={styles.fieldContainer}>
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

      <div className={styles.fieldContainer}>
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
      </form>
    </div>
  )
}