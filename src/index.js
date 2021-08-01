import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './api/server'
import store from './store';


// log initial state
// console.log('Initial state', store.getState());

// Every time the state changes, log it
store.subscribe(function() { 
 console.log(store.getState());
});



// Dispatch some action
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions'});
// store.dispatch({ type: 'todos/todoAdded', payload: 'Drink yorghurt'});
// store.dispatch({ type: 'filters/statusFilterChanged', payload: "HOT"});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
