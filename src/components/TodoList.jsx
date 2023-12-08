import React from "react";
import { MdDeleteForever } from "react-icons/md";

const style = {
  listMain: `list_item_main w-full rounded-md bg-zinc-600 p-4`,
  todoCompleted: `bg-black`,
  todoCompletedText: `line-through`,
  row: `flex items-center justify-between`,
  listText: `cursor-pointer text-xl text-white m-0`,
  listLeft: "list_left flex items-center gap-3",
  listBtn: `listBtn`,
  deleteButton: ``,
};
const TodoList = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className={`${style.listMain} ${todo.completed ? style.todoCompleted : ''} `}>
      <div className={style.row}>
        <div className={style.listLeft}>
          <input onChange={() => toggleComplete(todo)} className="w-4 rounded h-4" type="checkbox" checked={todo.completed ? 'checked' : ''} />
          <p onClick={() => toggleComplete(todo)} className={`${style.listText} ${todo.completed ? style.todoCompletedText : ''}`}>{todo.text}</p>
        </div>
        <div className={style.listBtn}>
        <button>
          <MdDeleteForever onClick={() => deleteTodo(todo.id)} color="red" size={30} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
