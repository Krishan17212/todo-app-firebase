import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";


const style = {
  listMain: `list_item_main w-full rounded-md bg-zinc-600 p-4`,
  todoCompleted: `bg-black`,
  todoCompletedText: `line-through`,
  row: `flex items-center justify-between`,
  listText: `cursor-pointer text-xl text-white m-0`,
  listLeft: "list_left flex items-center gap-3",
  listBtn: `listBtn flex items-center gap-2`,
  listSaveBtn: `flex gap-3`,
  listEdit: `rounded border px-2 text-white outline-none py-[3px] bg-zinc-600`,
  deleteButton: ``,
};
const TodoList = ({ todo, toggleComplete, deleteTodo, editTodo  }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update the todo text in Firebase
    editTodo(todo.id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the edited text and exit edit mode
    setEditedText(todo.text);
    setIsEditing(false);
  };


  return (
    <div className={`${style.listMain} ${todo.completed ? style.todoCompleted : ''} `}>
      <div className={style.row}>
        <div className={style.listLeft}>
          <input onChange={() => toggleComplete(todo)} className="w-4 rounded h-4" type="checkbox" checked={todo.completed ? 'checked' : ''} />
          {/* <p onClick={() => toggleComplete(todo)} className={`${style.listText} ${todo.completed ? style.todoCompletedText : ''}`}>{todo.text}</p> */}
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={style.listEdit}
            />
          ) : (
            <p
              onClick={() => toggleComplete(todo)}
              className={`${style.listText} ${todo.completed ? style.todoCompletedText : ''}`}
            >
              {todo.text}
            </p>
          )}
        </div>
        <div className={style.listBtn}>
        {isEditing ? (
            <div className={style.listSaveBtn}>
              <button onClick={handleSave}><FaSave color="yellow" size={24} /></button>
              <button onClick={handleCancel}><MdCancelPresentation color="orange" size={30} /></button>
            </div>
          ) : (
            <button onClick={handleEdit}><MdEditDocument color="orange" size={30} /></button>
          )}
        <button>
          <MdDeleteForever onClick={() => deleteTodo(todo.id)} color="red" size={30} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
