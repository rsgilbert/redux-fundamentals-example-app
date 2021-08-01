export const print1 = (storeAPI) => (next) => (action) => {
  return next(action)
}

// export const print2 = (storeAPI) => (next) => (action) => {
//   console.log('2', action.type);
//   if(action.type === 'todos/todoAdded') {
//     console.log('added');
//     storeAPI.dispatch({ type: 'todos/todoToggled', payload: 0 });
//     console.log('done')
//   }
//   return next(action)
// }

export const print3 = (storeAPI) => (next) => (action) => {
  return next(action)
}


export function logMiddleware(storeAPI) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Pass action onwards with next(action)
      // Or restart pipeline with storeAPI.dispatch(action)
      setTimeout(function() {
        console.log('Dispatched', action);
      }, 2000);
      return next(action);
    }
  }
}