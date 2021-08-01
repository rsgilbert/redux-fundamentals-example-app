import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import { includeMeaningOfLife, sayHiOnDispatch } from './exampleAddons/enhancers';
import { print1, logMiddleware } from './exampleAddons/middleware';

const middlewareEnhancer = applyMiddleware(logMiddleware, print1);

const composedEnhancer = compose(includeMeaningOfLife, sayHiOnDispatch);

const store = createStore(rootReducer, undefined, middlewareEnhancer);

export default store;
