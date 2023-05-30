import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send the entered inputs to the server for verification
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, securityCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // Verification successful, redirect to the edit profile page
        setSuccess(true);
      } else {
        // Verification failed, display the error message
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  if (success) {
    navigate("/edit-profile");
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Security Code:</label>
          <input
            type="text"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default ForgotPasswordPage;
