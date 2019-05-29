import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";
import BlankLayout from "./components/BlankLayout";

import Home from "./components/home";
import About from "./components/about";
import Login from "./components/Login";

var currentUrl = window.location.pathname.split("/");
console.log(currentUrl);

function App() {
  return currentUrl[1] === "login" ? (
    <BlankLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BlankLayout>
  ) : (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Layout>
  );

  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>
}

export default App;
