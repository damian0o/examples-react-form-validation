import React, { useState } from "react";
import "./App.css";

function fetchMock(url, options) {
  console.log("Fetch API Mock", "URL", url, "Options", options);

  return new Promise((resolve, reject) => {
    var body = JSON.stringify({
      errors: {
        firstName: "Invalid Value"
      }
    });
    var init = { status: 400, statusText: "Bad Request" };
    var response = new Response(body, init);
    setTimeout(() => {
      resolve(response);
    }, 300);
  });
}

function formDataToJson(formData) {
  let jsonObject = {};
  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
  }
  return jsonObject;
}

function App() {
  const [firstNameError, setFirstNameError] = useState("");

  const submitForm = e => {
    console.log("Form sumbit event", e);
    // Prevent browser for perform default submition mechanism
    e.preventDefault();

    // Get form data as Object
    const formInputs = formDataToJson(new FormData(e.target));
    console.log("Form input fields", formInputs);

    // Last thing is to send values from form inputs to API
    fetchMock("http://backend.test/form", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formInputs)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(json => {
        console.log("OK Response", json);
      })
      .catch(errorResponse => {
        errorResponse.json().then(({ errors }) => {
          setFirstNameError(errors.firstName);
        });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://codingtree.pl/tutorials/react/form-validation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Form Validation
        </a>
        <div>
          <form onSubmit={submitForm}>
            <input id="firstName" type="text" name="firstName" />
            {firstNameError && <div>{firstNameError}</div>}
            <input type="submit" />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
