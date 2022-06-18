import { useState, useEffect } from "react";
import "./todo.scss";
import axios from "axios";
import { currentUser } from "../../reducer/userReducer";
const TodoList = () => {
  const id = currentUser.id;
  const url = "http://localhost:3001/api/v1/todo/" + id;
  const fetchData = async () => {
    const data = await axios.get(url).then((res) => {
      const { todo } = res.data;
      setTodo(todo);
    });
  };

  const [selectedInput, setSelectedInput] = useState(null);
  const [value, setValue] = useState("");
  const [editState, setEditState] = useState(false);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const idx = todo.find((val) => val._id === id);
    setSelectedInput(idx);
    if (!idx.status) {
      setValue(idx.content);
      setEditState(true);
    } else {
      alert("You have already finished this task");
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3001/api/v1/todo/" + id;
    await axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        fetchData();
      });
  };

  const finish = async (id) => {
    const newTodo = todo.filter((val) => {
      if (val._id === id) {
        val.status = !val.status;
      }
      return val;
    });
    const findTodo = todo.find((val) => val._id === id);
    const token = localStorage.getItem("token");
    const url = "http://localhost:3001/api/v1/todo/status/" + id;
    await axios
      .patch(url, findTodo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    //setTodo(newTodo);
  };

  const update = async () => {
    const newValue = { ...selectedInput, content: value };

    const token = localStorage.getItem("token");
    const url = "http://localhost:3001/api/v1/todo/" + selectedInput._id;
    const updateTodo = await axios
      .patch(url, newValue, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setSelectedInput(null);
    setValue("");
    setEditState(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInput && value) {
      const id = currentUser.id;
      const token = localStorage.getItem("token");

      const url = "http://localhost:3001/api/v1/todo";
      const createTodo = {
        owner: currentUser.username,
        ownerID: id,
        title: "todo",
        content: value,
      };

      const response = await axios
        .post(url, createTodo, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          fetchData();
        })
        .catch((err) => {
          console.log(err.response);
        });
      setValue("");
    } else {
      console.log("b");
      update();
    }
  };

  const handleInput = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    setValue(inputValue);
  };
  return (
    <div className="container-todo">
      <div className="todo">
        <h2>TODO LIST</h2>
        <form action="" onSubmit={handleSubmit}>
          <input value={value} onChange={handleInput} type="text" />
          <button>{editState ? "Update" : "Add"}</button>
          {editState ? <button>Cancel</button> : null}
        </form>
        <ul>
          {todo.length ? (
            todo.map((val) => (
              <li className={val.status ? "finish" : null} key={val._id}>
                {val.content}
                <div className="icons">
                  <i
                    onClick={() => finish(val._id)}
                    className="icon fa-solid fa-check"
                  ></i>
                  <i
                    onClick={() => handleEdit(val._id)}
                    className="icon fa-solid fa-pen-to-square"
                  ></i>
                  <i
                    onClick={() => deleteTodo(val._id)}
                    className="icon fa-solid fa-trash"
                  ></i>
                </div>
              </li>
            ))
          ) : (
            <li>No items</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
