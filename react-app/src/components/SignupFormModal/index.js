import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [profile_url, setProfile_url] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
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
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <ul>
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
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John Doe"
            required
          />
          <i className="fa-solid fa-user"></i>
        </label>
        <label>
          Profile Picture
          <input
            type="text"
            value={profile_url}
            onChange={(e) => setProfile_url(e.target.value)}
            placeholder="enter URL here ..."
            required
          />
          <i className="fa-solid fa-image"></i>
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="enter password again"
            required
          />
          <i className="fa-solid fa-lock"></i>
        </label>
        <div className="modal-button-container">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
