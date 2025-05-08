import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import axios from "axios";
import "./BetaTesterForm.css";

const BetaTesterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Инициализируем хук для навигации

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
        "Спасибо за регистрацию! Вы будете перенаправлены на главную страницу через 5 секунд."
      );
      setEmail("");
      // Устанавливаем таймер на 5 секунд для перенаправления
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setMessage("Ошибка при регистрации. Попробуйте снова.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="beta-tester-form-container">
      <h2>Стать бета-тестером</h2>
      <form onSubmit={handleSubmit} className="beta-tester-form">
        <label htmlFor="email">Ваш email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@email.com"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default BetaTesterForm;
