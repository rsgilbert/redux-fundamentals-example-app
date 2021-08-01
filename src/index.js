import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './api/server'
import store from './store';


// log initial state
console.log('Initial state', store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(function() {
  console.log('State after dispatch', store.getState());
});



// Dispatch some action
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions'});

unsubscribe();

let uns2 = store.subscribe(function() { console.log("second subscription", store.getState()); })
store.dispatch({ type: 'todos/todoAdded', payload: 'Drink yorghurt'});
uns2();
store.dispatch({ type: 'filters/statusFilterChanged', payload: "HOT"});
uns2();
store.dispatch({ type: 'todos/todoToggled', payload: 0});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
