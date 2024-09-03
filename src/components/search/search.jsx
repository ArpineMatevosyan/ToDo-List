import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  isShowDone,
  isShowImportant,
  isShowAll,
  isSearch,
} from "../../store/todo/slice";
import Input from "../input/input";
import Button from "../button/button";

import styles from "./search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const { control, watch } = useForm({
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
