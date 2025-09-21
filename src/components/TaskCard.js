import React from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/slices/tasksSlice";
import { ChatBubbleLeftIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index, onStatusChange  }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch(updateTask({ id: task.id, changes: { status: newStatus } }));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl shadow-sm p-4 mb-4 ${
            snapshot.isDragging ? "bg-gray-100" : ""
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {task.priority}
            </span>

            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="border text-xs p-1 rounded"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex -space-x-2">
              {task.assignees?.map((user, i) => (
                <img
                  key={i}
                  src={user.avatar}
                  alt=""
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="flex space-x-3 items-center">
              <span className="flex items-center gap-1">
                <ChatBubbleLeftIcon className="w-4 h-4" />
                {task.comments} comments
              </span>
              <span className="flex items-center gap-1">
                <PaperClipIcon className="w-4 h-4" />
                {task.files} files
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
