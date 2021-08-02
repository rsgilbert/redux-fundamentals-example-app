import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import { includeMeaningOfLife, sayHiOnDispatch } from './exampleAddons/enhancers';
import { logMiddleware } from './exampleAddons/middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';



const middlewareEnhancer = applyMiddleware(thunkMiddleware, logMiddleware);

const composedEnhancer = compose(includeMeaningOfLife, sayHiOnDispatch);

const devToolsEnhancer = composeWithDevTools(
    // Add all necessary middleware 
    middlewareEnhancer
);

const store = createStore(rootReducer, undefined, devToolsEnhancer);

export default store;
