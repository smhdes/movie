import React, { Children } from "react";
import styles from "./atom-button.module.scss";
import { IButtonProps } from "./types/button-types";
const AtomButton = (props: IButtonProps) => {
  const { text, onClick, size = "medium", type = "primary", icon } = props;

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event);
  };
  return (
    <button onClick={handleOnClick} className={styles["button"]}>
      {icon} {text}
    </button>
  );
};
export default AtomButton;
