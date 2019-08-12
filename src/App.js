import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const submitForm = e => {
    e.preventDefault();
    console.log("Form sumbit event", e);

    const formInputs = e.target.elements;
    console.log("Form input fields", formInputs);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Form Validation
        </a>
        <div>
          <form onSubmit={submitForm}>
            <input type="text" name="standardString" />
            <input type="submit" />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
