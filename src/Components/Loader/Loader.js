import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.overlay}>
    <div className={styles.terminalLoader}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTitle}>Status</div>
        <div className={styles.terminalControls}>
          <div className={`${styles.control} ${styles.close}`}></div>
          <div className={`${styles.control} ${styles.minimize}`}></div>
          <div className={`${styles.control} ${styles.maximize}`}></div>
        </div>
      </div>
      <div className={styles.text}>Processing</div>
    </div>
    </div>
  );
};

export default Loader;
