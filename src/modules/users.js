import Axios from 'axios';
import { usersModel } from '../models/users';
export const USER_KEY = 'USER_KEY';

// ------------------------------------
// Selectors
// ------------------------------------
export const userModuleSelector = state => state[USER_KEY];

// ------------------------------------
// Reducer
// ------------------------------------
const actionHandlers = {};
const initialState = {
  users: { loading: false, error: [], users: []},
}
export default function userModuleReducer(state = initialState, { type, payload }) {
  const handler = actionHandlers[type]

  return handler ? handler(state, payload) : state
}

// ------------------------------------
// Actions
// ------------------------------------

/* GET_USER_LOADING */
export const GET_USER_LOADING = `${USER_KEY}/GET_USER_LOADING`;
export const getUserLoadingAction = () => ({
  type: GET_USER_LOADING,
  payload: null,
})
actionHandlers[GET_USER_LOADING] = (state) => ({
  ...state,
  users: {...state.users, loading: true},
});

/* GET_USER_ERROR */
export const GET_USER_ERROR = `${USER_KEY}/GET_USER_ERROR`;
export const getUserErrorAction = (error) => ({
  type: GET_USER_ERROR,
  payload: error,
})
actionHandlers[GET_USER_ERROR] = (state, action) => ({
  ...state,
  users: {...state.users, error: [...action], loading: false},
})

/* GET_USER_SUCCESS */
export const GET_USER_SUCCESS = `${USER_KEY}/GET_USER_SUCCESS`;
export const getUserSuccessAction = (users) => console.log('users',users) || ({
  type: GET_USER_SUCCESS,
  payload: users,
})
actionHandlers[GET_USER_SUCCESS] = (state, action) => console.log('payload',action) || ({
  ...state,
  users: {...state.users, users: [...usersModel(action)],loading: false},
})

/* GET GET_USER */
export const getUser = () => (dispatch) => {
  dispatch(getUserLoadingAction());

  return Axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => dispatch(getUserSuccessAction(response.data)))
  .catch(error => dispatch(getUserErrorAction(error)))
}
/* PATCH UPDATE_USER
  @param user {}
*/
export const patchUser = (user) => (dispatch) => {
  dispatch(getUserLoadingAction());

  return Axios.patch('https://jsonplaceholder.typicode.com/users' + user.id, user)
  .then(response => dispatch(getUserSuccessAction(response.data)))
  .catch(error => dispatch(getUserErrorAction(error)))
}
