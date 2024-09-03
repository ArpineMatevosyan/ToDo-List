import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isDone,
  isDelItem,
  isToDoList,
  isImportant,
  isEditingId,
  isAddedItemDone,
} from "../../store/todo/slice";
import { FaEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import Button from "../button/button";
import EditToDo from "./component/editToDo/editToDo";

import styles from "./toDoList.module.scss";

const ToDoList = ({ className }) => {
  const {
    toDoList,
    important,
    showToDoList,
    searchToDoList,
    toggleShowToDoList,
  } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const data = !toggleShowToDoList ? toDoList : showToDoList;
  const dataList = searchToDoList.length ? searchToDoList : data;

  const deleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(() => dispatch(isDelItem(id)));
  };

  const toggleComplete = (id) => {
    if (id < 200) {
      const todoToUpdate = toDoList.find((todo) => todo.id === id);
      console.log(toDoList);
      console.log(todoToUpdate);
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...todoToUpdate,
          completed: !todoToUpdate.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((updatedTodo) => {
          dispatch(isDone({ id, updatedTodo }));
        });
    } else dispatch(isAddedItemDone(id));
  };
  const toggleImportant = (id) => {
    dispatch(isImportant(id));
  };
  const editToDo = (id) => {
    dispatch(isEditingId(id));
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((data) => dispatch(isToDoList(data)));
  }, [dispatch]);

  return (
    <div className={styles.toDoList}>
      {dataList.length ? (
        dataList.map((todo, idx) => (
          <div className={styles.toDoItem} key={idx}>
            <div
              className={clsx(
                styles.toDoText,
                todo.completed && styles.completed,
                important.includes(todo?.id) && styles.important
              )}
            >
              <p className={clsx(className)}>{todo?.title}</p>
            </div>
            <div className={styles.control}>
              <Button
                children={<FaEdit />}
                onClick={() => editToDo(todo?.id)}
              />
              <Button
                children={<MdDone />}
                onClick={() => toggleComplete(todo?.id)}
              />
              <Button
                children={<FaInfo />}
                onClick={() => toggleImportant(todo?.id)}
              />
              <Button
                children={<MdDelete />}
                onClick={() => deleteTodo(todo?.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noTodo}>No ToDo yet</div>
      )}
      <EditToDo />
    </div>
  );
};

export default ToDoList;
