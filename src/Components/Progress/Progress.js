import React from 'react'
import styles from './Progress.module.css';

const Progress = () => {
  return (
    <div className={styles.overlay} id="progressOverlay">
        <div
          className={styles.progress}
          id="progressbar"
        ></div>
    </div>
  )
}

export default Progress