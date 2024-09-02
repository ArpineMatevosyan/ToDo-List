import { useController } from "react-hook-form";
import styles from "./input.module.scss";

import clsx from "clsx";
const Input = ({ type = "text", control, name, className, placeholder }) => {
  const { field } = useController({ control, name });

  return (
    <input
      type={type}
      className={clsx(styles.input, className)}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
