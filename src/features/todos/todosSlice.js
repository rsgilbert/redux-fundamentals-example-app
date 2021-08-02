import { client } from '../../api/client';
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    todos: [
        { id: 0, text: 'Learn redux', completed: true },
        { id: 1, text: 'Learn Redux', completed: false },
        { id: 2, text: 'Building something fun', completed: false }
    ],
    status: 'NO CHANGE'
}

function nextTodoId(state) {
    const maxId = state.todos.reduce(function(maxSoFar, currTodo) {
        return Math.max(maxSoFar, currTodo.id)
    }, -1);
    return maxId + 1;
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async function() {
    const response = await client.get('/fakeApi/todos');
    console.log('c a r', response);
    return response.todos;
});

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async function(text) {
    const initialTodo = { text };
    console.log('initial', initialTodo);
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });
    console.log(response)
    return response.todo.text;
});

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
    },
    extraReducers: function(builder) {
        builder
            .addCase(saveNewTodo.fulfilled, function(state, action) {
                console.log('save fulfilled', action);
                state.status = 'SAVED';
            })
            .addCase(saveNewTodo.pending, function(state, action) {
                state.status = 'SAVING';
            })
            .addCase(fetchTodos.pending, function(state, action) {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, function(state, action) {
                console.log('fulfilled', action)
                state.status = 'fulfilled';
            })
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
// Deprecated, use the new fetchTodos function
export async function deprecated_fetchTodos(dispatch, getState) {    
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

// Deprecated
export function deprecated_saveNewTodo(text) {
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


