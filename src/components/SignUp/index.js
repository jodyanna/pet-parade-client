import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import userContext from "../../context/userContext";
import SignUpForm from "../SignUpForm";
import styles from "./index.module.css";

export default function SignUp() {
  const [isRedirect, setIsRedirect] = useState(false);

  const triggerRedirect = () => setIsRedirect(true);

  return (

    <userContext.Consumer>
      {
        ({ login }) => {
          return (
            <div className={styles.container}>
              {isRedirect ? <Redirect to="/"/> : null}
              <SignUpForm login={login} triggerRedirect={triggerRedirect}/>
            </div>
          )
        }
      }
    </userContext.Consumer>
  )
}