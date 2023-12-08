import React, { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import TodoList from "./TodoList";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc 
} from "firebase/firestore";
import { db } from "../db/firebase";

const style = {
  main: `todo_wrapper relative max-w-4xl w-full bg-zinc-700 py-10 px-6 lg:p-10 rounded-xl`,
  form: `form_main flex items-center`,
  formInput: `flex-grow p-2 lg:p-3 rounded-md text-md lg:text-xl outline-none`,
  formBtn: `text-orange sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`,
  listItems: `list_items gap-4 flex flex-wrap mt-12`,
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const iconSize = window.innerWidth > 640 ? 70 : 50;

  // create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if(input === '') {
      alert('Please enter a valid input');
      return
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    })
    setInput('');
  };

  // read todo from filrebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((todo) => {
        todosArr.push({ ...todo.data(), id: todo.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // update todo

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  // delete todo

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  }
  return (
    <>
      <div className={style.main}>
        <div className="todo_title text-center font-semibold text-zinc-300 text-4xl lg:text-6xl mb-8">
          <h1>Todo App</h1>
        </div>
        <div className="todo_form">
          <form onSubmit={createTodo} className={style.form}>
            <input
              className={style.formInput}
              type="text"
              placeholder="Add Todo"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button className={style.formBtn}>
              <MdAddBox size={iconSize} color="orange" />
            </button>
          </form>
        </div>

        <div className="todo_list">
          <div className={style.listItems}>
            {todos.map((todo, index) => (
              <TodoList
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        </div>
        {todos.length > 0 && <div className="bottom_text text-white text-center mt-5 text-xl font-semibold">
          {todos.length < 1 ? null : `You have ${todos.length} todo`}
        </div>}
        
      </div>
    </>
  );
};

export default Todo;
