import { client } from '../../api/client';
import { createSelector, createSlice } from '@reduxjs/toolkit';

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


const todosSlice = createSlice({ 
    name: 'todos', 
    initialState,
    reducers: {
        todoAdded: {
            reducer(state, action) {
                console.log('bef',action);
                state.todos.push(//{
                    //id: nextTodoId(state),
                    action.payload
                );
            },

            prepare(text) {
                return {
                    payload: { 
                        id: text.length,
                        text,
                        completed: false
                    }
                }
            }
        },
        todoToggled(state, action) {
            const todo = state.todos.find(function(todo) {
                return todo.id === action.payload;
            });
            todo.completed = !todo.completed;
        },
        todoLoaded(state, action) {
            state.todos = action.payload;
        },

        todosLoading(state, action) {
            return {
                ...state,
                status: 'loading'
            }
        }
    }
});

// Action creators
export const { todoAdded, todoToggled, todoLoaded, todosLoading } = todosSlice.actions;

export default todosSlice.reducer;

// Deprecated
// Old fashioned way of created sub reducers

export function deprecated_todosReducer(state = initialState, action) {
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
    console.log(response);
    dispatch(todoLoaded(response.todos)); 
    console.log(todoAdded('Omega'));
    dispatch(todosLoading())
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


