import React, { memo, useState } from "react";
import styles from "./VerificationForm.module.scss"; // Import module.scss file
import { post } from "../../Services/ApiService";

const VerificationForm = ({ showOrHideLoader }) => {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      // Move focus to the next input field
      if (index < inputs.length - 1 && value.length > 0) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && inputs[index] === "") {
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
        const newInputs = [...inputs];
        newInputs[index - 1] = "";
        setInputs(newInputs);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    showOrHideLoader(true);
    const otp = inputs.join("");
    // Handle OTP verification logic here
    console.log("Verifying OTP:", { otp });

    await post("/otp", { otp });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.title}>OTP</div>
      <div className={styles.title}>Verification Code</div>
      <p className={styles.message}>We have sent a verification code to your mobile number</p>
      <div className={styles.inputs}>
        {inputs.map((value, index) => (
          <input
            key={index}
            id={`input-${index}`} // Add unique ID for each input
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={styles.input} // Apply styles from module.scss
          />
        ))}
      </div>
      <button className={styles.action} type="submit">
        Verify me
      </button>
    </form>
  );
};

export default memo(VerificationForm);
