import { client } from '../../api/client';
import { createSelector } from 'reselect';


const initialState = [
    { id: 0, text: 'Learn redux', completed: true },
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Building something fun', completed: false }
]

function nextTodoId(todos) {
    const maxId = todos.reduce(function(maxSoFar, currTodo) {
        return Math.max(maxSoFar, currTodo.id)
    }, -1);
    return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
    switch(action.type) {
        case 'todos/todoAdded': {
            return [
                ...state,
                {
                    id: nextTodoId(state),
                    text: action.payload,
                    completed: false
                }
            ]
        }
        case 'todos/todoToggled': {
            return state.map(function(todo) {
                if(todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        }
        case 'todos/todoLoaded': {
            return action.payload;
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

export function saveNewTodo(text) {
    console.log('newt', text);
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = { text };
        console.log('initial', initialTodo);
        const response = await client.post('/fakeApi/todos', { todo: initialTodo });
        console.log(response)
        dispatch({ type: 'todos/todoAdded', payload: response.todo.text })
    }
}


export const selectTodoIds = createSelector(
    function(state) { return state.todos },
    function(todos) { return todos.map(function(todo) { return todo.id })}
)


