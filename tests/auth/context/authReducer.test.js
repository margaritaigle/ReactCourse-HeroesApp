import { authReducer } from "../../../src/auth";
import { types } from "../../../src/auth/types/types";



describe('Testing authReducer', () => {
    
    const authReducerMock = jest.fn()
    
    test('should return the default state', () => { 
        const state = authReducer({logged: false}, {})

        expect(state).toEqual({logged: false})
     });

     test('should call login, authenticate and set the user', () => { 
        const action = {
            type: types.login,
            payload: { id: "345", name: "Margarita"}
        }

        const state = authReducer({logged: false}, action);

        expect(state).toEqual({logged: true, user: action.payload});
      });

test('should call logout and clean the user data and should show the property logged in false',  () => { 
    
    const state = {
        type: types.login,
        payload: { id: "345", name: "Margarita"}
    }
    const action = {
        type: types.logout,
    }
    const newState = authReducer(state, action);

    expect(newState).toEqual({logged: false});
 })
 })