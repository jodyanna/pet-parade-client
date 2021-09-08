import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import userContext from "./context/userContext";
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import User from "./components/User";
import Leaderboard from "./components/Leaderboard";

const initUserState = {
  id: 1,
  username: "hamsandwich",
  email: "hamsandwich@email.com",
  city: "Chicago",
  state: "Illinois",
  dateCreated: new Date(),
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
          <Header />
          <Switch>
            <Route path="/user">
              <User user={user} login={login} />
            </Route>

            <Route path="/leaderboard">
              <Leaderboard />
            </Route>

            <Route path="/login">
              <Login login={login} />
            </Route>

            <Route path="/signup">
              <SignUp login={login} />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </userContext.Provider>
  );
}
