import React from 'react'
import { useState } from 'react'
import { useTodoContext } from '../contexts/index'

function TodoItem({ todo }) {
    const { removeTodo, toggleTodo, editTodo } = useTodoContext();
    const [todoMsg, setTodoMsg] = useState(todo.text)
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    
    const updateTodo = () => {
        editTodo(todo.id, { ...todo, text: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleTodo(todo.id)
    }

    return (
        // Toggle Todo Item
        <div
           className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm bg-gradient-to-r from-purple-500 to-pink-500 duration-300  text-black ${
              todo.completed ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
           }`}
        >
           <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
           />
           <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                 isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
           />
           {/* Edit, Save Button */}
           <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                 if (todo.completed) return;

                 if (isTodoEditable) {
                    updateTodo();
                 } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
           >
              {isTodoEditable ? "📁" : "✏️"}
           </button>
           {/* Delete Todo Button */}
           <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => removeTodo(todo.id)}
           >
              ❌
           </button>
        </div>
    );
}
export default TodoItem;
