import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store'
import { saveNewTodo, selectTodoIds } from './todosSlice';


function selectTodos(state) { return state.todos; }

export default function TodoList() {
    const todos = useSelector(selectTodos);
    const todoIds = useSelector(selectTodoIds);


    const renderListItems = todoIds.map(function(todoId) {
        return (
            <TodoListItem
                key={todoId}
                todo={todoId}
                />
        );
    });
    return (
        <ul>
            { renderListItems }
        </ul>
    )
}

function TodoListItem({ todo }) {
    const [newTodo, setNewTodo] = useState('');
    const dispatch = useDispatch();
    function handleChange({ target }) {
        setNewTodo(target.value);
        const saveThunk = saveNewTodo(target.value);
        dispatch(saveThunk);
    }

    return (
        <li>
            <input 
                value={newTodo}
                onChange={handleChange}
                />
            <h1>{ todo }</h1>
            <p>{ todo.text }</p>
        </li>
    )
}