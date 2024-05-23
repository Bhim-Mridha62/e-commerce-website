import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText}>Loading Please wait ...</div>
    </div>
  );
};

export default Loading;
