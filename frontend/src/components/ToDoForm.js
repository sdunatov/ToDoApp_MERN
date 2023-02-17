import React from 'react'

const ToDoForm = ({createToDo, name, handleInputChange, isEditing, updateToDo}) => {
    return(
        <form className='formToDo' onSubmit={isEditing ? updateToDo : createToDo}>
            <input type="text" placeholder='Dodajte zadatak' name='name' value={name} onChange={handleInputChange}></input>
        <button type='submit'>{isEditing ? "Uredi zadatak" : "Dodaj novi zadatak"}</button>
        </form>
    )
}

export default ToDoForm