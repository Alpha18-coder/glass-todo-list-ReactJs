import React, { useState, useRef, useEffect } from 'react';
import UsePrevious from './UsePrevious';
import {Create, Delete} from '@material-ui/icons';
import './TodoItem.css';

function TodoItem(props) {
    const [isEditing, setEditing] = useState(false);
    const [newText, setNewText] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newText.trim()) {
            return;
        }
        props.editTask(props.id, newText, setEditing);
        setNewText("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="editTodo" onSubmit={handleSubmit}>
            <div className="edit-container">
                <label className="todo-label" htmlFor={props.id}>
                    New text:
                </label>
                <input 
                    type="text"
                    id={props.id}
                    className="todo-text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    ref={editFieldRef}
                    autoComplete="off"
                />            
            </div>
           
            <div className="editBtn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel
                </button>
                <button type="submit" className="btn btn__primary todo-save">
                    Save
                </button>
            </div>
        </form>
    )

    const viewTemplate = (
        <div className="todo-container">
            <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
            />
             <label className="todo-label" htmlFor={props.id}>
                {props.text}
            </label>
            <div className="btn-group">
                <button 
                    className="btn todo-edit"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                  <Create />
                </button>
                <button 
                  className="btn todo-delete" 
                  onClick={() => props.deleteTask(props.id)}
                >
                  <Delete />
                </button>
            </div>
        </div>
    )


    const wasEditing = UsePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);


    return <li id={props.id} className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}

export default TodoItem;
