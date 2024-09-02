import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { isAdd } from "../../store/todo/slice";
import Input from "../../components/input/Input";

import styles from "./addToDo.module.scss";
import Button from "../button/button";

const AddToDo = () => {
  const { toDoList } = useSelector((state) => state.todo);

  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: 1,
      id: "",
      title: "",
      completed: false,
    },
  });
  const addItem = handleSubmit((data) => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newTodo) => {
        dispatch(isAdd(newTodo));
        reset();
      });
  });
  return (
    <div className={styles.container}>
      <Input placeholder="Item text..." control={control} name="title" />
      <Button onClick={addItem} children="Add item" />
    </div>
  );
};

export default AddToDo;
