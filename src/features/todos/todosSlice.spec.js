import { isAsyncThunkAction } from '@reduxjs/toolkit';
import reducer, { todoAdded } from './todosSlice';

describe('todosSlice', function() {
    let state;

    beforeEach(function() {
        state = {
            todos: [],
            status: 'NO CHANGE'
        };
    });

    it('returns the initial state', function() {
        expect(reducer(undefined, {})).toEqual({
            todos: [
                { id: 0, text: 'Learn redux', completed: true },
                { id: 1, text: 'Learn Redux', completed: false },
                { id: 2, text: 'Building something fun', completed: false }
            ],
            status: 'NO CHANGE'
        });
    });

    describe('todos/todoAdded', function() {
        it('adds todo to empty list', function() {
            expect(reducer(state, todoAdded('Hello'))).toEqual({
                todos: [{ id: 0, text: 'Hello', completed: false }],
                status: 'NO CHANGE'
            });
        });

        it('adds todo to non-empty list', function() {
            state = {
                todos: [ { id: 0, text: 'Hello', completed: false } ],
                status: 'NO CHANGE'
            }
            expect(reducer(state, todoAdded('Green'))).toMatchObject({
                todos: [
                    { id: 0, text: 'Hello', completed: false },
                    { id: 1, text: 'Green', completed: false }
                ],
            })
        })
    });
    // it('toggles a todo based on id', function() {
    //     const initialState = [ { id: 0, text: 'Test text', completed: false }];
    //     const action = { type: 'todos/todoToggled', payload: 0 };
    //     const result = todosReducer(initialState, action);
    //     expect(result[0].completed).toBe(true);
    // });
});




