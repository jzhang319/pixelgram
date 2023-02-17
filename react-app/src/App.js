import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PhotoDetail from "./components/Home/PhotoDetail";
import Home from "./components/Home/Home";
import MessageSideBar from "./components/MessageSideBar/MessageSideBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="whole-page-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/photos/:photoId'>
            <PhotoDetail />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      )}
      <div className="home-message-both">
        <MessageSideBar />
      </div>
    </div>
  );
}

export default App;
