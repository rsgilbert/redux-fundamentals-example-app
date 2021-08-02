import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './api/server'
import store from './store';
import { Provider } from 'react-redux';
import { fetchTodos } from './features/todos/todosSlice';
import { todoAdded } from './features/todos/todosSlice';


store.dispatch(fetchTodos);


store.dispatch(todoAdded('HI there friend'));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
