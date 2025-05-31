import { useState, useEffect, useRef } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { Analytics } from "@vercel/analytics/react";
import "./Todo.css";

const todokey = "ReactTodo";

export const Todo = () => {
  const [task, setTask] = useState(() => {
    const rawTodos = localStorage.getItem(todokey);
    if (typeof rawTodos !== "string" || rawTodos.length === 0) {
      return [];
    }
    try {
      return JSON.parse(rawTodos);
    } catch (e) {
      console.error("Error parsing JSON from localStorage:", e);
      return [];
    }
  });

  // Audio reference
  const audioRef = useRef(null);

  // Save to localStorage whenever task changes
  useEffect(() => {
    localStorage.setItem(todokey, JSON.stringify(task));
  }, [task]);

  // Play audio only when tab is active and after user clicks once
  useEffect(() => {
    const audio = audioRef.current;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        audio?.play().catch(console.warn);
      } else {
        audio?.pause();
      }
    };

    const playAudioOnClick = () => {
      if (document.visibilityState === "visible") {
        audio?.play().catch(console.warn);
      }
      document.removeEventListener("click", playAudioOnClick); // Only once
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", playAudioOnClick);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", playAudioOnClick);
    };
  }, []);

  const handelFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    if (!content) return;

    const ifTodoContentMatched = task.find(
      (CurTask) => CurTask.content === content
    );
    if (ifTodoContentMatched) return;

    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  };

  const handleDeleteTodo = (value) => {
    const updatedtask = task.filter((CurTask) => CurTask.content !== value);
    setTask(updatedtask);
  };

  const handleClearTodoData = () => {
    setTask([]);
  };

  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((CurTask) => {
      if (CurTask.content === content) {
        return { ...CurTask, checked: !CurTask.checked };
      } else {
        return CurTask;
      }
    });
    setTask(updatedTask);
  };

  return (
    <>
      {/* Background Video */}
      <div className="background-video">
        <video autoPlay muted loop>
          <source src="/i.mp4" type="bgvideo/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Background Audio */}
      <audio ref={audioRef} src="/audio/bindi.mp3" loop />

      <section className="todo-container">
        <header>
          <h1>Todo List</h1>
          <TodoDate />
        </header>

        <TodoForm onAddTodo={handelFormSubmit} />

        <section className="myUnOrdList">
          <ul>
            {task.map((CurTask) => (
              <TodoList
                key={CurTask.id}
                data={CurTask.content}
                checked={CurTask.checked}
                onhandleDeleteTodo={handleDeleteTodo}
                onhandleCheckedTodo={handleCheckedTodo}
              />
            ))}
          </ul>
        </section>

        <section>
          <button className="clear-btn" onClick={handleClearTodoData}>
            Clear All
          </button>
        </section>
      </section>
      <Analytics />

    </>
  );
};
