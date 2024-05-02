import React from "react";
import styles from "./Display.module.css"; // Import CSS module styles

const Display = ({ input, setInput, answer }) => {
  const onChangeTagInput = (e) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  return (
    <>
      <div className={styles.display}>
        {answer === "" ? (
          <>
            <input
              type="text"
              name="input"
              className={styles.input}
              style={{ padding: "29px" }}
              value={input}
              placeholder="0"
              maxLength={12}
              onChange={onChangeTagInput}
              autoComplete="off"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="input"
              className={styles.value}
              value={input}
              placeholder="0"
              maxLength={12}
              disabled
            />
            <input
              type="text"
              name="value"
              className={styles.input}
              value={answer}
              disabled
            />
          </>
        )}
      </div>
    </>
  );
};

export default Display;
