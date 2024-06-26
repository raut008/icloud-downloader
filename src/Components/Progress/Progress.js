import React from 'react'
import styles from './Progress.module.css';

const Progress = () => {
  return (
    <div className={styles.overlay} id="progressOverlay">
        <div
          className={styles.progress}
          id="progressbar"
        >
        </div>
        <progress className={styles.progressBar} id="file" value="0" max="100"></progress>    
    </div>
  )
}

export default Progress