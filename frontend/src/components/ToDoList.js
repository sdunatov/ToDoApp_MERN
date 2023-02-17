import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm'
import axios from 'axios'

const ToDoList = () => {
    const [toDos, setToDos] = useState([])
    const [completedtoDo, setCompletedToDo] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [toDoId, setToDoId] = useState()

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })
    const {name} = formData;
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData( {...formData, [name]: value })
    }

    const getToDos = async () => {
        setIsLoading(true)
        try {
            const {data} = await axios.get("http://localhost:3001/api/todos")
            setToDos(data)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getToDos();
    }, []);

    const createToDo = async (e) => {
        e.preventDefault()
        //console.log(formData);
        if (name === "") {
            return toast.error("Unesite zadatak")
            
        }
        try {
            await axios.post("http://localhost:3001/api/todos", formData)
            toast.success("Zadatak je uspješno dodan")
            setFormData({...formData, name: ""})
            getToDos();
        } catch (error) {
            toast.error(error.message);
        }

    };

    const deleteToDo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/todos/${id}`)
            //refresh stranice
            getToDos();
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const cToDo = toDos.filter((todo) => {
            return todo.completed === true;
        })

        setCompletedToDo(cToDo);
    }, [toDos])

    const getSingleToDo = async (todo) => {
        setFormData({name: todo.name, completed: false})
        setToDoId(todo._id)
        setIsEditing(true)
    }

    const updateToDo = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("Unesite zadatak") 
        }
        try {
            await axios.put(`http://localhost:3001/api/todos/${toDoId}`, formData)
            setFormData({...formData, name: ""})
            setIsEditing(false)
            getToDos()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const setToComplete = async (todo) => {
        const newFormData = {
            name: todo.name,
            completed: true
        }
        try {
            await axios.put(`http://localhost:3001/api/todos/${todo._id}`, newFormData)
            //refresh stranice
            getToDos()
        } catch (error) {
            toast.error(error.message)
        }
    };

    return(
        <div>
            <h2>Moji zadaci ✍️</h2>
            <ToDoForm  name={name} handleInputChange={handleInputChange} 
            createToDo={createToDo} isEditing={isEditing}
            updateToDo = {updateToDo} />

            
            
            
            {
                !isLoading && toDos.length === 0 ? (
                    <p>Dodajte zadatak </p>
                ) : (
                    <div>
                    {toDos.map((todo) => {
                        return(
                            <ToDo key={todo._id} todo={todo} 
                            deleteToDo={deleteToDo} getSingleToDo={getSingleToDo}
                            setToComplete={setToComplete}/>
                        )
                    })}
                    </div>
                )
            }
            <hr />
            {toDos.length > 0 && (<div className='textBetween'>
                <p>
                    Obavili ste {completedtoDo.length} od {toDos.length} zadataka.
                
                </p>
            </div>)}
            
        </div>
    )
}

export default ToDoList;