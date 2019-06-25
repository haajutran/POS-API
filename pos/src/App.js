import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";
import BlankLayout from "./components/BlankLayout";

import Home from "./components/home";
import TableMap from "./components/TableMap";
import About from "./components/about";
import Login from "./components/Login";
import TableDetail from "./components/Table/Detail";
import DetailEmpty from "./components/Table/DetailEmpty";

var currentUrl = window.location.pathname.split("/")[1];
// console.log(currentUrl);

// function checkAuth() {
//   const posUser = localStorage.getItem("posUser");
//   if (!posUser || posUser.length < 1) {
//     window.location.replace("/login");
//   }
// }

function App() {
  return currentUrl === "login" ? (
    <BlankLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BlankLayout>
  ) : (
    <Layout>
      <Switch>
        <Route exact path="/" component={TableMap} />
        <Route path="/tablemap" component={TableMap} />
        <Route path="/tabledetail" component={TableDetail} />
        <Route path="/detailempty" component={DetailEmpty} />
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
