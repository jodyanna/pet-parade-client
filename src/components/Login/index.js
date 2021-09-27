import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../LoginForm";
import styles from "./index.module.css";

export default function Login({login}) {
  const [isRedirect, setIsRedirect] = useState(false);
  const [isError, setIsError] = useState(false);

  const triggerRedirect = () => setIsRedirect(true);
  const handleError = message => setIsError(message);

  return (
    <div className={styles.container}>
      {isRedirect ? <Redirect to="/" /> : null}
      <LoginForm login={login} handleError={handleError} triggerRedirect={triggerRedirect} />
      {
        isError && <p className={styles.errorText}>Login failed. Please check username and/or password.</p>
      }
    </div>
  )
}
