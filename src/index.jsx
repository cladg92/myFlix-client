import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
/*import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import moviesApp from "./reducers/reducers";*/

import MainView from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//const store = configureStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
