import { createStore, compose, applyMiddleware } from 'redux';
import { includeMeaningOfLife, sayHiOnDispatch } from './exampleAddons/enhancers';
import { logMiddleware } from './exampleAddons/middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import filtersReducer from './features/filters/filtersSlice';


const rootReducer = {
    todos: todosReducer,
    filters: filtersReducer
}

const store = configureStore({ reducer: rootReducer });

export default store;
