import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      {/* <div className="login_logo">
        <h1 className="login_pixel">Pixel</h1>
        <h1 className="login_gram">
          <em>gram</em>
        </h1>
      </div> */}
      <img
        className="logo"
        src="https://cdn.discordapp.com/attachments/885032629299212308/1078464745935482910/687474703a2f2f7265732e636c6f7564696e6172792e636f6d2f616e6e616f682f696d6167652f75706c6f61642f635f63726f702c685f3337352c775f3936352c785f34352f76313531323136373130302f4c6f676f6d616b725f3264746e65305f6668756574692e706e67.png"
        alt="logo"
      />
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="error-section">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@doe.com"
            required
          />
          <i className="fa-solid fa-envelope"></i>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <i className="fa-solid fa-lock"></i>
        </label>
        <div className="modal-button-container">
          <button className="signup-button" type="submit">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
