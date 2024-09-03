import clsx from "clsx";

import styles from "./button.module.scss";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={clsx(className, styles.button)}>
      {children}
    </button>
  );
};

export default Button;
