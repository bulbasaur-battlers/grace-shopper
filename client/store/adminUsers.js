import axios from 'axios';

const SET_USERS = 'SET_USERS';
const TOKEN = 'token'

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
      const { data: users } = await axios.get('/api/users', {
        headers: {
          authorization: token
        }
      } );
      dispatch(setUsers(users));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default function adminUsersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
