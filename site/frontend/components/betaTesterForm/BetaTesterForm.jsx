import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BetaTesterForm.css";

const BetaTesterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await axios.post(
        "https://competitivearena.up.railway.app/api/beta-testers",
        { email }
      );
      setMessage(
        "Thanks for registering! You will be redirected to the main page in 5 seconds."
      );
      setEmail("");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setMessage("Registration error. Try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="beta-tester">
      <div className="beta-tester-form-container">
        <h2 className="beta-tester__title">Become a beta tester</h2>
        <form onSubmit={handleSubmit} className="beta-tester-form">
          <label htmlFor="email">Enter Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
          />
          <p className="betatester__formDown">
            We will contact you via this email.
          </p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Register"}
          </button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default BetaTesterForm;
