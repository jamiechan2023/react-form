import { useState } from "react";
const Authenticate = ({ token, setToken }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("get result for authenticate-->", result);
      setSuccessMessage(result.message);
      return result;
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
