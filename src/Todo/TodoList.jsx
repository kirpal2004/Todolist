import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

export const TodoList = ({ data,checked, onhandleDeleteTodo,onhandleCheckedTodo }) => {
  return (
    <li className="todo-item">
      <span className={checked ? "checkList" : "notCheckList"}>{data}</span>
      <button className="check-btn" onClick={() => onhandleCheckedTodo(data)}>
        <IoMdCheckmarkCircleOutline />
      </button>

      <button className="delete-btn" onClick={() => onhandleDeleteTodo(data)}>
        <MdDeleteForever />
      </button>
    </li>
  );
};
