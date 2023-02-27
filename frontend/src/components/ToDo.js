import React from 'react'
import { FiEdit2 } from "react-icons/fi"
import { BsCheck2All } from "react-icons/bs"
import { GoTrashcan } from "react-icons/go"

const ToDo = ({ todo, deleteToDo, getSingleToDo, setToComplete }) => {
    return (
        <div className={todo.completed ? "todoCompleted" : "todo"}>
            <p>
                {todo.name}
            </p>
            <p>{todo.createdAt.substring(0, 10)}</p>
            <p>{todo.category}</p>
            <p>{todo.date}</p>


            <div className='icons'>
                <BsCheck2All onClick={() => {
                    setToComplete(todo)
                }} />
                <FiEdit2 onClick={() => {
                    getSingleToDo(todo)
                }} />
                <GoTrashcan onClick={() => {
                    deleteToDo(todo._id)
                }} />
            </div>
        </div>
    )
}

export default ToDo