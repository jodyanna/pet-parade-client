import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import userContext from "../../context/userContext";
import SignUpForm from "../SignUpForm";

export default function SignUp() {
  const [isRedirect, setIsRedirect] = useState(false);

  const triggerRedirect = () => setIsRedirect(true);

  return (

    <userContext.Consumer>
      {
        ({ login }) => {
          return (
            <div>
              {isRedirect ? <Redirect to="/"/> : null}
              <SignUpForm login={login} triggerRedirect={triggerRedirect}/>
            </div>
          )
        }
      }
    </userContext.Consumer>
  )
}