import React, { memo } from "react";
import styles from "./Loading.module.css";

const Loading = memo(({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>Loading Please wait ...</div>
      </div>
    </div>
  );
});

export default Loading;
