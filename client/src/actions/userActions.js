import axios from "axios";
import { LOGIN, REGISTER } from "./type";

const login = (value, navigate) => async (dispatch) => {
  const { username, password } = value;
  const response = await axios
    .post("http://localhost:3001/api/v1/user/login", value)
    .catch((err) => {
      alert(err);
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      return res;
    });
  if (response.data.success) {
    navigate("/");

    dispatch({
      type: LOGIN,
      payload: response,
      username,
      password,
    });
  } else {
    alert(response.data.message);
  }
};

const register = (user, navigate) => async (dispatch) => {
  const { email, password } = user;
  const data = {
    username: email,
    password,
  };
  const res = await axios.post(
    "http://localhost:3001/api/v1/user/createUser",
    data
  );
  if (res.data.success) {
    navigate("/login");
  } else {
    alert(res.data.message);
  }
  dispatch({
    type: REGISTER,
    payload: "",
  });
};

export { login, register };
