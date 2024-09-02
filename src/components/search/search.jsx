import { useEffect } from "react";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import {
  isShowDone,
  isShowImportant,
  isShowAll,
  isSearch,
} from "../../store/todo/slice";
import styles from "./search.module.scss";
import clsx from "clsx";
import Button from "../button/button";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const { toDoList, important } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const searchValue = watch("search");
  const handleDone = () => {
    dispatch(isShowDone());
  };
  const handleImportant = () => {
    dispatch(isShowImportant());
  };
  const handleAll = () => {
    dispatch(isShowAll());
  };
  useEffect(() => {
    dispatch(isSearch(searchValue));
  }, [searchValue, dispatch]);
  return (
    <div className={styles.searchContainer}>
      <Input
        name="search"
        control={control}
        placeholder="Type text for search..."
      />
      <div className={styles.searchControl}>
        <Button className={styles.all} children="All" onClick={handleAll} />
        <Button className={styles.done} children="Done" onClick={handleDone} />
        <Button
          children="Important"
          onClick={handleImportant}
          className={styles.important}
        />
      </div>
    </div>
  );
};

export default Search;
