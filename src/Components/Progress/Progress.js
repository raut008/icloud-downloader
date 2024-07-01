import React from "react";
import styles from "./Progress.module.css";

const Progress = ({}) => {
  return (
    <div className={styles.overlay} id="progressOverlay">
      <div className={styles.datadetails} id="datadetails"></div>
      <div className={styles.progress} id="progressbar"></div>
      <progress className={styles.progressBar} id="file" value="0" max="100"></progress>
      <button id="okbutton" className={styles.okbutton} onClick={() => window.location.reload()}>
        OK
      </button>
    </div>
  );
};

export default Progress;
