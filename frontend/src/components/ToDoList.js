import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ToDo from './ToDo';
import Select from './Select';
import ToDoForm from './ToDoForm'
import Date from './Date';
import axios from 'axios'
import SelectFilter from './SelectFilter';


const ToDoList = () => {
    const [toDos, setToDos] = useState([])
    const [completedtoDo, setCompletedToDo] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [toDoId, setToDoId] = useState()

    const options = [
        { label: 'Osobno', value: 'osobno' },
        { label: 'Posao', value: 'posao' },
        { label: 'Trening', value: 'trening' }
    ]

    const optionsFilter = [
        { label: 'Sve', value: 'sve' },
        { label: 'Osobno', value: 'osobno' },
        { label: 'Posao', value: 'posao' },
        { label: 'Trening', value: 'trening' }
    ]

    const [formData, setFormData] = useState({
        name: "",
        completed: false,
        category: "osobno",
        date: ""
    })

    const { name } = formData;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    //const [value, setValue] = useState("osobno");

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, category: value });
        //setValue(value);
    }
    const [filteredTodos, setFilteredTodos] = useState([]);
    const handleSelectFilterChange = (e) => {
        const { value } = e.target;

        //setFilteredTodos(toDos.filter(todo => todo.category === value));

        if (value === "sve") {
            setFilteredTodos(toDos);
        } else {
            const filtered = toDos.filter(todo => todo.category === value);
            setFilteredTodos(filtered);
        }
        setFormData({ ...formData, category: value });
        //setValue(value);
    }

    const handleDateChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, date: value })
    }

    //const [date, setDate] = useState('');

    /*const handleDateChange = (e) => {
        const { date, value } = e.target;
        //setDate(e.target.value)
        setFormData({ ...formData, [date]: value })

    }*/

    const getToDos = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get("http://localhost:3001/api/todos")
            setToDos(data)
            setIsLoading(false)
            setFilteredTodos(data);
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
            //console.log(date, formData)
            toast.success("Zadatak je uspješno dodan")
            setFormData({ ...formData, name: "" })
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
        setFormData({ name: todo.name, completed: false })
        //setDate(todo.date)
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
            setFormData({ ...formData, name: "" })
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



    return (
        <div>
            <h2>Moji zadaci ✍️</h2>
            <ToDoForm name={name} handleInputChange={handleInputChange}
                createToDo={createToDo} isEditing={isEditing}
                updateToDo={updateToDo} />

            <Select options={options} value={formData.category} onChange={handleSelectChange} />
            <Date date={formData.date} onChange={handleDateChange} />
            <br></br>
            <br></br>
            <br></br>
            <div className='textLabel'>
                <p>Zadatak:</p>
                <p>Vrijeme kreiranja:</p>
                <p>Kategorija:</p>
                <p>Mora se obaviti do:</p>
            </div>
            {
                !isLoading && toDos.length === 0 ? (
                    <p>Dodajte zadatak </p>
                ) : (
                    <div>
                        {filteredTodos.map((todo) => {
                            return (
                                <ToDo key={todo._id} todo={todo}
                                    deleteToDo={deleteToDo} getSingleToDo={getSingleToDo}
                                    setToComplete={setToComplete} />
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
            </div>
            )}
            <div>
                <p>Prikaži zadatke iz kategorije:</p>
                <SelectFilter options={optionsFilter} value={optionsFilter.value} onChange={handleSelectFilterChange} />
            </div>
        </div>
    )
}

export default ToDoList;