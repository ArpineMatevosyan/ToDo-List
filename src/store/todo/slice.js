import { createSlice } from "@reduxjs/toolkit";

const ToDo = createSlice({
  name: "ToDo",
  initialState: {
    toDoList: [],
    important: [],
    editingId: "",
    showToDoList: [],
    searchToDoList: [],
    toggleShowToDoList: false,
  },
  reducers: {
    isToDoList: (state, action) => {
      state.toDoList = action.payload;
    },
    isImportant: (state, action) => {
      if (state.important.includes(action.payload)) {
        state.important = state.important.filter(
          (todoId) => todoId !== action.payload
        );
      } else state.important.push(action.payload);
    },
    isDelItem: (state, action) => {
      state.toDoList = state.toDoList.filter(
        (todo) => todo.id !== action.payload
      );
      state.important = state.important.filter(
        (importantId) => importantId !== action.payload
      );
      state.showToDoList = state.showToDoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    isDone: (state, action) => {
      state.toDoList = state.toDoList.map((todo) =>
        todo.id === action.payload.id ? action.payload.updatedTodo : todo
      );
    },
    isAdd: (state, action) => {
      state.toDoList.push(action.payload);
    },
    isAddedItemDone: (state, action) => {
      state.toDoList = state.toDoList.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );
    },
    isShowDone: (state) => {
      state.toggleShowToDoList = true;
      state.showToDoList = state.toDoList.filter((todo) => todo.completed);
    },
    isShowImportant: (state) => {
      state.toggleShowToDoList = true;
      state.showToDoList = state.toDoList.filter((todo) =>
        state.important.includes(todo?.id)
      );
    },
    isShowAll: (state) => {
      state.toggleShowToDoList = false;
    },
    isSearch: (state, action) => {
      if (action.payload.length > 0) {
        const filteredToDoList = state.toDoList.filter((todo) =>
          todo.title.includes(action.payload)
        );
        state.searchToDoList =
          filteredToDoList.length > 0
            ? filteredToDoList
            : [{ title: "No search item" }];
      } else {
        state.searchToDoList = [];
      }
    },
    isEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    isEditDone: (state, action) => {
      state.toDoList = state.toDoList.map((todo) =>
        todo.id === state.editingId ? { ...todo, title: action.payload } : todo
      );
      state.editingId = "";
    },
  },
});

export const {
  isAdd,
  isDone,
  isSearch,
  isShowAll,
  isDelItem,
  isToDoList,
  isEditDone,
  isShowDone,
  isImportant,
  isEditingId,
  isAddedItemDone,
  isShowImportant,
} = ToDo.actions;
export default ToDo;
