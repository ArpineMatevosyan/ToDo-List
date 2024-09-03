import clsx from "clsx";
import { useController } from "react-hook-form";

import styles from "./input.module.scss";

const Input = ({ type = "text", control, name, className, placeholder }) => {
  const { field } = useController({ control, name });

  return (
    <input
      {...field}
      type={type}
      placeholder={placeholder}
      className={clsx(styles.input, className)}
    />
  );
};

export default Input;
