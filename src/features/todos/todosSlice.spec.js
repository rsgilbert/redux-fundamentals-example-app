import todosReducer from './todosSlice';

test('Toggles a todo based on id', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: false }]
  
    const action = { type: 'todos/todoToggled', payload: 0 }
    const result = todosReducer(initialState, action)
    expect(result[0].completed).toBe(true)
  });


describe('todosSlice', function() {
    it('toggles a todo based on id', function() {
        const initialState = [ { id: 0, text: 'Test text', completed: false }];
        const action = { type: 'todos/todoToggled', payload: 0 };
        const result = todosReducer(initialState, action);
        expect(result[0].completed).toBe(true);
    });
});




