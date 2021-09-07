import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../LoginForm";
import styles from "./index.module.css";

export default function Login({login}) {
  const [isRedirect, setIsRedirect] = useState(false);

  const triggerRedirect = () => setIsRedirect(true);

  return (
    <div className={styles.container}>
      {isRedirect ? <Redirect to="/"/> : null}
      <LoginForm login={login} triggerRedirect={triggerRedirect}/>
    </div>
  )
}
