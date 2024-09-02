import AddToDo from "./components/addToDo/addToDo";
import ListLine from "./components/listLine/listLine";
import Search from "./components/search/search";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";

export const App = () => {
  const { toDoList, important } = useSelector((state) => state.todo);

  const done = toDoList.filter((todo) => todo.completed).length;

  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <h1>MY TODO LIST</h1>
        <div className={styles.itemCount}>
          <span>Done:{done}</span>
          <span>Important:{important.length}</span>
        </div>
      </div>
      <Search />
      <ListLine />
      <AddToDo />
    </div>
  );
};
export default App;
