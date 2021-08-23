import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.css";
import errorIcon from "./error-icon.png";


export default function SignUpForm({login, triggerRedirect}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: {
      message: "",
      isValid: true
    },
    email: {
      message: "",
      isValid: true
    },
    password: {
      message: "",
      isValid: true
    }
  });

  const handleUsernameChange = e => setUsername(e.target.value)
  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleSubmit = e => {
    e.preventDefault();

    validateForm()
      .then(isValid => {
        if (isValid) {
          let data = {
            "userName": username,
            "password": password,
            "userEmail": email,
          }

          fetch("", {
            method: "POST",
            body: JSON.stringify(data)
          }).then(res => res.json())
            .then(res => {
              if (res.result) {
                data.userId = res.id;
                delete data.password;

                login(data);
                triggerRedirect();
              }
            })
            .catch(error => console.log(error));
        }
      })
  }

  const validateForm = async () => {
    let errors = {
      username: {},
      email: {},
      password: {}
    }

    errors.username = validateTextField(username);
    errors.email = validateTextField(email);
    errors.password = validateTextField(password);

    setErrors(errors);

    return errors.username.isValid && errors.email.isValid && errors.password.isValid
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
    <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>

          <div className={styles.fieldContainer}>
            <label htmlFor="username" className={styles.textInputLabel}>
              Username
              <p className={styles.errorText}>{errors.username.message}</p>
            </label>
            <div className={styles.textInputContainer}>
              <input type="text"
                     name="username"
                     value={username}
                     className={errors.username.isValid ? styles.textInput : styles.textInputError}
                     onChange={handleUsernameChange}
              />
              {
                !errors.username.isValid &&
                <img src={errorIcon} alt="warning-icon" className={styles.errorIcon} />
              }
            </div>
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="email" className={styles.textInputLabel}>
              Email
              <p className={styles.errorText}>{errors.email.message}</p>
            </label>
            <div className={styles.textInputContainer}>
              <input type="email"
                     name="email"
                     value={email}
                     className={errors.email.isValid ? styles.textInput : styles.textInputError}
                     onChange={handleEmailChange}
              />
              {
                !errors.email.isValid &&
                <img src={errorIcon} alt="warning-icon" className={styles.errorIcon} />
              }
            </div>
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="password" className={styles.textInputLabel}>
              Password
              <p className={styles.errorText}>{errors.password.message}</p>
            </label>
            <div className={styles.textInputContainer}>
              <input type="password"
                     name="password"
                     value={password}
                     className={errors.password.isValid ? styles.textInput : styles.textInputError}
                     onChange={handlePasswordChange}
              />
              {
                !errors.password.isValid &&
                <img src={errorIcon} alt="warning-icon" className={styles.errorIcon} />
              }
            </div>
          </div>

          <input type="submit"
                 value="Sign up"
                 className={styles.button}
          />
          <div className={styles.prompt}>
            Already have an account? <Link to={"/login"}>Log in</Link>
          </div>
        </form>
      </div>
  )
}
