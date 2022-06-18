import { LOGIN, REGISTER } from "../actions/type";

const currentUser = {
  username: "",
  password: "",
  id: "",
};

const userReducer = (state = currentUser, action) => {
  switch (action.type) {
    case LOGIN:
      const { payload, username, password } = action;
      console.log(payload);
      const { success, userID } = payload.data;
      if (payload.data.success) {
        currentUser.username = username;
        currentUser.password = password;
        currentUser.id = userID;
        return {
          ...state,
          ...currentUser,
        };
      }
    case REGISTER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export { userReducer, currentUser };
