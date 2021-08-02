import { client } from '../../api/client';
import { createSelector } from '@reduxjs/toolkit';


const initialState = {
    todos: [
        { id: 0, text: 'Learn redux', completed: true },
        { id: 1, text: 'Learn Redux', completed: false },
        { id: 2, text: 'Building something fun', completed: false }
    ],
    status: 'idle'
}

function nextTodoId(state) {
    const maxId = state.todos.reduce(function(maxSoFar, currTodo) {
        return Math.max(maxSoFar, currTodo.id)
    }, -1);
    return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
    switch(action.type) {
        case 'todos/todoAdded': {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: nextTodoId(state),
                        text: action.payload,
                        completed: false
                    }
                ]
            }
        }
        case 'todos/todoToggled': {
            return {
                ...state,
                todos: state.todos.map(function(todo) {
                    if(todo.id === action.payload) {
                        return { ...todo, completed: !todo.completed };
                    }
                    return todo;
                })
            }
        }
        case 'todos/todoLoaded': {
            return {
                ...state,
                todos: action.payload
            }
        }
        case 'todos/todoLoading': {
            return {
                ...state,
               status: 'loading'
            }
        }

        case 'todos/todoIdle': {
            return {
                ...state,
                status: 'idle'
            }
        }
        case 'todos/todoError': {
            return {
                ...state,
                status: 'error'
            }
        }

        default:
            return state;
    }
}

// Thunk function
export async function fetchTodos(dispatch, getState) {
    const response = await client.get('/fakeApi/todos');
    dispatch({ type: 'todos/todoLoaded' , payload: response.todos });
}

export function dispatchLoading(dispatch) {
    dispatch({ type: 'todos/todoLoading' });
}

export function dispatchIdle(dispatch) {
    dispatch({ type: 'todos/todoIdle' });
}

export function saveNewTodo(text) {
    console.log('newt', text);
    return async function saveNewTodoThunk(dispatch, getState) {
        dispatchLoading(dispatch);
        const initialTodo = { text };
        console.log('initial', initialTodo);
        const response = await client.post('/fakeApi/todos', { todo: initialTodo });
        console.log(response)
        dispatch({ type: 'todos/todoAdded', payload: response.todo.text })
        dispatchIdle(dispatch);
    }
}


export const selectTodoIds = createSelector(
    function(state) { return state.todos.todos },
    function(todos) { return todos.map(function(todo) { return todo.id })}
)


