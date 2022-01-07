import React, { useState } from 'react'
import './TodoForm.css';
import AddIcon from '@material-ui/icons/Add';

function TodoForm(props) {
    const[text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text.trim()) {
            return;
        }
        props.addTask(text);
        setText("");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="form__input"
                placeholder="What to do next?" 
                onChange = {(e) => setText(e.target.value)}
                value={text}
                name="text"
                autoComplete="off"
            />

            <button className="form__btn"> <AddIcon /> </button>
        </form>
    )
}

export default TodoForm;
