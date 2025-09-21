import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks, highlight, onStatusChange }) => {
  const color =
    column.id === "todo" ? "blue" : column.id === "inprogress" ? "orange" : "green";

  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`bg-gray-300 rounded-xl p-4 transition-all ${
            snapshot.isDraggingOver || highlight ? "bg-purple-50" : ""
          }`}
        >
          <div className="mb-4 shadow flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  color === "blue"
                    ? "bg-blue-500"
                    : color === "orange"
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
              ></span>
              <h2 className="text-lg font-semibold">{column.title}</h2>
              <span className="text-sm text-gray-500">({tasks.length})</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">+</button>
          </div>
          <div
            className={`h-1 rounded-full mb-3 ${
              color === "blue"
                ? "bg-blue-500"
                : color === "orange"
                ? "bg-orange-500"
                : "bg-green-500"
            }`}
          ></div>

          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onStatusChange={onStatusChange} // pass dropdown handler
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
