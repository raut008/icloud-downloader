// Footer.js

import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2024 Webstream Media. All rights reserved.</p>
        <div className={styles.contact}>
          <a href="mailto:webstreammedia2024@gmail.com">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
