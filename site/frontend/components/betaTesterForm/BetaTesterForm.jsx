import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BetaTesterForm.css";

const BetaTesterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");

    try {
      const { data } = await axios.get("/api/csrf-token");
      await axios.post(
        "/api/beta-testers",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": data.csrfToken,
          },
        }
      );
      setMessage(
        "Thanks for registering! You will be redirected to the main page in 5 seconds."
      );
      setEmail("");
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
        <h2 className="beta-tester__title">
          Become <span>a</span> beta tester
        </h2>
        <form onSubmit={handleSubmit} className="beta-tester-form">
          <label htmlFor="email">Enter Your Email:</label>
          <input
            type="email	winow"
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
