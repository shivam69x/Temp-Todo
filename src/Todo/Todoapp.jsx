import { useEffect, useRef, useState } from "react";
import todocss from "./Todo.module.css";
import boxcss from "./box.module.css";
import toggleCss from "./Todo.module.css";

import { toast } from "react-hot-toast";
import Taskdone from "./Taskdone";
// import Checkbox from "./Checkbox"

function Todoapp() {
  const [todo, settodo] = useState("");
  const [totalTask, setTotalTask] = useState(0);
  const [completeTask, setCompleteTask] = useState(0);
  const [PendingTask, setPendingTask] = useState(0);

  // ---{Dark to light mode}----------main problem in code is here this show error while Running---.

  const darkMode = useRef("");
  darkMode.current.style.backgroundColor = "red";

  // ------this lower code is running---.

  // const DarkMode = useRef(null);

  // useEffect(() => {
  //   if (DarkMode.current) {
  //     DarkMode.current.style.backgroundColor = "#000000";

  //     DarkMode.current.style.backgroundImage =
  //       " radial-gradient(#555555 0.45px, transparent 0.45px),       radial-gradient(#555555 0.45px,rgb(207, 207, 255) 0.45px)";
  //     DarkMode.current.style.backgroundSize = "18px 18px;";
  //     DarkMode.current.style.backgroundPosition = "0 0, 9px 9px;";
  //   }
  // }, []);

  // const textColor = useRef("");

  // textColor.current.style.color = "black";

  // useEffect(() => {
  //   if (textColor.current) {

  //   }
  // }, []);

  // function handleDarkMode(){

  // }

  // ---{Dark to light mode}--------------code--

  function handleSubmit(e) {
    e.preventDefault();

    const myTask = todo.trim();

    if (!myTask) {
      toast.error("Please enter a task");
    } else {
      const isVerify = todo_task.some((value, index) => {
        return value.Task.toLowerCase() === myTask.toLowerCase();
      });

      if (isVerify) {
        toast.error("Task already exist");
        settodo("");
      } else {
        setTodo_task([...todo_task, { Task: todo, complete: false }]);
        toast.success("Task added");
        settodo("");
      }
    }
  }

  const todo_data = JSON.parse(localStorage.getItem("todo_data")) || [
    { Task: "Go to Class", complete: false },
    { Task: "Go to Gym", complete: false },
    { Task: "8'hrs of Sleep", complete: false },
    { Task: "Eat DR Protein", complete: false },
  ];

  const [todo_task, setTodo_task] = useState(todo_data);

  function handleClick(id) {
    const CopyofArray = [...todo_task];

    CopyofArray[id].complete = !CopyofArray[id].complete;

    setTodo_task(CopyofArray);

    // ---{task progress}--------------
  }

  function handleDelete(id) {
    const CopyofArrayDelete = [...todo_task];

    const DeleteValue = CopyofArrayDelete.filter((value, index) => {
      return index !== id;
    });

    setTodo_task(DeleteValue);
  }

  function handleUpdate(id) {
    const CopyofArrUpdate = [...todo_task];
    const oldValue = CopyofArrUpdate[id].Task;

    const newValue = prompt(`${oldValue}`, oldValue);

    if (newValue) {
      const newObj = { Task: newValue, complete: false };

      CopyofArrUpdate.splice(id, 1, newObj);

      setTodo_task(CopyofArrUpdate);
    }
  }

  useEffect(() => {
    const CopyofArray = [...todo_task];

    const TotalTasks = CopyofArray.filter((value, index) => {
      return value;
    });

    setTotalTask(TotalTasks.length);

    const CompletedTasks = CopyofArray.filter((value, index) => {
      return value.complete;
    });

    setCompleteTask(CompletedTasks.length);

    const PendingTask = CopyofArray.filter((value, index) => {
      return !value.complete;
    });

    setPendingTask(PendingTask.length);

    localStorage.setItem("todo_data", JSON.stringify(CopyofArray));
  }, [todo_task]);

  function handleAllClear() {
    setTodo_task([]);
  }

  const refHook = useRef("");

  function handleFocus() {
    refHook.current.focus();
  }

  return (
    <div
      className={todocss.pri_container}
      // ref={darkMode}
    >
      <label className={toggleCss.switch}>
        <input type="checkbox" />
        <span className={toggleCss.slider}></span>
      </label>

      <div className={todocss.sec_container}>
        <h2 className={todocss.heading}>TODO APP</h2>

        <Taskdone Ctask={completeTask} Ttask={totalTask} Ptask={PendingTask} />

        <form onSubmit={handleSubmit} className={todocss.form}>
          <input
            type="text"
            className={todocss.inputbox}
            value={todo}
            onChange={(e) => {
              settodo(e.target.value);
            }}
            ref={refHook}
          />

          <button className={todocss.btn_1} onClick={handleFocus}>
            Add Task
          </button>
        </form>

        <ui
          className={boxcss.items}
          // ref={textColor}
        >
          {todo_task.length === 0 ? (
            <>
              <p className="text-center">No Task Found ❌</p>
              <hr />
            </>
          ) : (
            todo_task.map((value, index) => (
              <>
                <li>
                  <div className="form-check d-inline ">
                    <input
                      style={{ cursor: "pointer" }}
                      type="checkbox"
                      checked={value.complete}
                      onClick={() => {
                        handleClick(index);
                      }}
                      className="form-check-input ms-0 me-2"
                    />
                  </div>

                  <span
                    style={{
                      float: "left",

                      textDecoration:
                        value.complete === true ? "line-through red" : "",
                      opacity: value.complete === true ? 0.5 : 1,
                    }}
                  >
                    {value.Task}
                  </span>

                  <i
                    style={{ cursor: "pointer" }}
                    class="bi bi-x-circle float-end text-danger fs-6"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></i>

                  <i
                    style={{ cursor: "pointer" }}
                    class="bi bi-pencil-square float-end text-info me-3"
                    onClick={() => {
                      handleUpdate(index);
                    }}
                  ></i>
                </li>
              </>
            ))
          )}
        </ui>

        <div className={todocss.ContClearAll}>
          <button
            className={todocss.clearBtn}
            onClick={handleAllClear}
            style={{ display: todo_task.length === 0 ? "none" : "block" }}
          >
            Clear All Tasks
            <i
              style={{ padding: "8px" }}
              class="fa-solid fa-trash fa-sm"
              onClick={handleAllClear}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todoapp;
