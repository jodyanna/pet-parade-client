import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import SignUpForm from "../SignUpForm";
import styles from "./index.module.css";

export default function SignUp({login}) {
  const [isRedirect, setIsRedirect] = useState(false);

  const triggerRedirect = () => setIsRedirect(true);

  return (
    <div className={styles.container}>
      {isRedirect ? <Redirect to="/"/> : null}
      <SignUpForm login={login} triggerRedirect={triggerRedirect}/>
    </div>
  )
}