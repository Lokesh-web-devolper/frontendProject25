import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const capch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const [runCpach, setCapcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const generateCaptcha = () => {
    let capchaLetters = "";
    for (let i = 0; i < 7; i++) {
      let randNumber = Math.floor(Math.random() * capch.length);
      capchaLetters += capch[randNumber];
    }
    setCapcha(capchaLetters);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const displayNameError = (e) => {
    if (e.target.value === "") {
      setNameError("Username cannot be blank");
    } else {
      setNameError("");
    }
  };

  const displayEmailError = (e) => {
    if (e.target.value === "") {
      setEmailError("Password cannot be blank.");
    } else {
      setEmailError("");
    }
  };

  const handleVerification = (e) => {
    const value = e.target.value;
    setEnteredCaptcha(value);
    if (value !== runCpach) {
      setCaptchaError("The verification code is incorrect.");
    } else {
      setCaptchaError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || enteredCaptcha.trim() === "") {
      alert("Please fill all fields correctly before logging in!");
      return;
    }

    if (enteredCaptcha !== runCpach) {
      alert("Captcha verification failed!");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;
      const foundUser = users.find(
        (user) => user.username === name && user.password === email
      );

      if (foundUser) {
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later");
    }
  };

  let color = ["#1982c4", "#cb997e", "#aad576", "#9f8be8", "#2a2b47", "#a83aa8"];
  let [bgColor, setColor] = useState(color[0]);
  let clr1 = () => setColor(color[0]);
  let clr2 = () => setColor(color[1]);
  let clr3 = () => setColor(color[2]);
  let clr4 = () => setColor(color[3]);
  let clr5 = () => setColor(color[4]);
  let clr6 = () => setColor(color[5]);

  return (
    <div className='container-fluid main_container d-flex flex-column flex-md-row align-items-center justify-content-center p-0' style={{ backgroundColor: bgColor }}>
      <div className='d-none d-md-flex flex-column justify-content-center align-items-center side_container1 text-center px-3'>
        <div className='side_container text-center'>
        </div>
        <div className='text_container'>
          <p className='side_container_text '>© Copyright 2024 by K L Deemed to be University. All Rights Reserved.</p>
        </div>
      </div>
      <div className='main_card col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 main_card p-4 shadow rounded'>
        <div className='d-flex mt-3 justify-content-between'>
          <div className='img_element'>
            <img className='card_image' src='https://newerp.kluniversity.in/images/logo9.png' alt="KL University Logo"/>
            <img className='card_image' src='https://newerp.kluniversity.in/images/klh-logo2.png' alt="KLH Logo"/>
          </div>
          <div className='clr_cont'>
            <div className='color_container clr1' onClick={clr1}></div>
            <div className='color_container clr2' onClick={clr2}></div>
            <div className='color_container clr3' onClick={clr3}></div>
            <div className='color_container clr4' onClick={clr4}></div>
            <div className='color_container clr5' onClick={clr5}></div>
            <div className='color_container clr6' onClick={clr6}></div>
          </div>
        </div>
        <div className='cardElements mt-5'>
          <h1 className='login_head text-center mt-5'>Login</h1>
          <form className='input_elements' onSubmit={handleSubmit}>
            <div>
              <input
                className='inputElements form-control'
                type='text'
                placeholder='Enter Username'
                id='username'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={displayNameError}
              />
              <p className='nameError'>{nameError}</p>
            </div>
            <div>
              <input
                className='inputElements form-control'
                type='password'
                id='password'
                placeholder='Enter Password'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={displayEmailError}
              />
              <p className='emailError'>{emailError}</p>
            </div>
            <div>
              <input type='checkbox' id='check' />
              <label htmlFor="check">Remember Me</label>
            </div>
            <div>
              <input className='capcha' type='text' value={runCpach} readOnly />
              <button type="button" onClick={generateCaptcha}>🔄</button>
            </div>
            <input
              className='inputElements form-control'
              type='text'
              placeholder='Enter verification Code'
              value={enteredCaptcha}
              onChange={handleVerification}
              onBlur={handleVerification}
            />
            <p className='CaptchaError'>{captchaError}</p>
            <div className='anchor_elements'>
              <a href=''>Forgot Password?</a>
              <p>|</p>
              <a href=''>Parent Registration?</a>
              <a href=''>MFA Registration?</a>
            </div>
            <button type='submit' className='btn btn-primary mt-5' style={{ backgroundColor: bgColor }}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
