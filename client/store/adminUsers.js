import axios from 'axios';

const SET_USERS = 'SET_USERS';

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get('/api/users');
      dispatch(setUsers(users));
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
