import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store'
import { saveNewTodo, selectTodoIds } from './todosSlice';


function selectTodos(state) { return state.todos; }
function selectStatus(state) { return state.todos.status }




export default function TodoList() {
    const todos = useSelector(selectTodos);
    const todoIds = useSelector(selectTodoIds);
    const status = useSelector(selectStatus);


    const renderListItems = todoIds.map(function(todoId) {
        return (
                <TodoListItem
                    key={todoId}
                    todo={todoId}
                    />
            
        );
    });
    return (
        <React.Fragment>
             <p>{ status }</p>
             <ul>
                { renderListItems }
            </ul>
        </React.Fragment>
        
    )
}

function TodoListItem({ todo }) {
    const [newTodo, setNewTodo] = useState('');
    const dispatch = useDispatch();
    function handleChange({ target }) {
        setNewTodo(target.value);        
    }

    function handleBlur({ target }) {
        dispatch(saveNewTodo(target.value));
    }

    return (
        <li>
            <input 
                value={newTodo}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            <h1>{ todo }</h1>
            <p>{ todo.text }</p>
        </li>
    )
}