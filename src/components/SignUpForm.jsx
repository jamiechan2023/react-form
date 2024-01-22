import { useState } from "react";

const SignUpForm = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const specialchar = /[!@#$%^&*]/g;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError(null);
      if (username === "" || password === "") {
        setError("Username and Password cannot be blank!");
      } else if (!password.match(lowerCase)) {
        setError("Password should contains lower case letters!");
      } else if (!password.match(upperCase)) {
        setError("Password should contains upper case letters!");
      } else if (!password.match(numbers)) {
        setError("Password should contains numbers!");
      } else if (!password.match(specialchar)) {
        setError("Password should contains special characters!");
      } else {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );
        const result = await response.json();
        console.log("post result for signup -->", result);
        setToken(result.token);
        return result;
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            id="password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button>Submit</button>
      </form>
    </>
  );
};

export default SignUpForm;
