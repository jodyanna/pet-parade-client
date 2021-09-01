import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import userContext from "../../context/userContext";
import LoginForm from "../LoginForm";

export default function Login() {
  const [isRedirect, setIsRedirect] = useState(false);

  const triggerRedirect = () => setIsRedirect(true);

  return (
    <userContext.Consumer>
      {
        ({ login }) => {
          return (
            <div>
              {isRedirect ? <Redirect to="/"/> : null}
              <LoginForm login={login} triggerRedirect={triggerRedirect}/>
            </div>
          )
        }
      }
    </userContext.Consumer>
  )
}
