import { useState } from "react";
const Authenticate = ({ token, setToken }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  async function handleClick() {
    try {
      setError(null);
      if (token === null) {
        setError("Please sign-up before auathenticate!");
      } else {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log("get result for authenticate-->", result);
        setSuccessMessage(
          `${result.message} (Username: ${result.data.username})`
        );
        return result;
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
};

export default Authenticate;
