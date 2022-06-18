import { Button } from "antd";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import TodoList from "../Todo/todo";

const Home = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.userReducer.username);
  const password = useSelector((state) => state.userReducer.password);
  const user = useSelector((state) => state.userReducer);
  return (
    <div>
      {user.username && user.password ? (
        <TodoList></TodoList>
      ) : (
        <div className="home-page">
          <h1 className=" flex-adj">ToDo List</h1>
          <div className="buttons flex-adj">
            <Button type="primary" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Go to Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
