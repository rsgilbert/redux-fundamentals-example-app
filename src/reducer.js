import todosReducer from './features/todos/todosSlice';
import filtersReducer from './features/filters/filtersSlice';


export default function rootReducer(state = {}, action) {
    // Always return a new object for the root state
    // The final state is what we get when we perform the provided
    // action on all the reducers we have available
    return {
        todos: todosReducer(state.todos, action),
        filters: filtersReducer(state.filters, action)
    }
}