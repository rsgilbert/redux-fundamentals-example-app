const initialState = [
    // { id: 0, text: 'Learn redux', completed: true },
    // { id: 1, text: 'Learn Redux', completed: false },
    // { id: 2, text: 'Building something fun', completed: false }
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
        default:
            return state;
    }
}