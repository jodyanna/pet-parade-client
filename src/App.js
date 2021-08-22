import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import userContext from "./context/userContext";
import './App.css';
import Login from "./components/Login";

const initUserState = {
  id: null,
  username: "",
  email: "",
  city: "",
  state: "",
  dateCreated: null,
  dateModified: null
};

export default function App() {
  const [user, setUser] = useState(initUserState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = user => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("pet-parade-user-info", JSON.stringify(user));
  }

  const logout = () => {
    setUser(initUserState);
    setIsLoggedIn(false);
    localStorage.removeItem("pet-parade-user-info");
  }

  useEffect(() => {
    if (window.performance) {
      if (performance.getEntriesByType("navigation")[0].type.localeCompare("reload") === 0) {
        let parsedData = JSON.parse(localStorage.getItem("pet-parade-user-info"));

        if(parsedData !== null) {
          setUser(parsedData);
          setIsLoggedIn(true);
        }
      }
    }
  }, []);

  return (
    <userContext.Provider value={{user: user, isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <Router>
      <div className="App">
      <Login></Login>
      <Switch>
        <Route>
          
        </Route>
      </Switch>
    </div>
    </Router>
    </userContext.Provider>
  );
}
