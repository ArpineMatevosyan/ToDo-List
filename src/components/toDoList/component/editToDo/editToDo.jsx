import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { isEditDone } from "../../../../store/todo/slice";
import Input from "../../../input/input";
import Button from "../../../button/button";

import styles from "./editToDo.module.scss";

const EditToDo = () => {
  const { toDoList, editingId } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const editItem = toDoList.filter((todo) => todo.id === editingId);
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      editValue: "",
    },
  });

  const saveEditing = handleSubmit((data) => {
    dispatch(isEditDone(data.editValue));
  });

  useEffect(() => {
    if (editItem) {
      setValue("editValue", editItem[0]?.title);
    }
  }, [editItem, setValue]);

  return (
    <div className={editingId ? styles.editingBox : styles.hidEditingBox}>
      <h2>Edit your ToDo</h2>
      <div>
        <Input type="text" name="editValue" control={control} />
        <Button children="Save" onClick={saveEditing} />
      </div>
    </div>
  );
};

export default EditToDo;
