import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: {
    "1": {
      id: "1",
      title: "Brainstorming",
      description:
        "Brainstorming brings team members’ diverse experience into play.",
      status: "todo",
      priority: "Low",
      category: "General",
      assignees: [
        { avatar: "/avatars/a1.png" },
        { avatar: "/avatars/a2.png" },
      ],
      comments: 12,
      files: 0,
    },
    "2": {
      id: "2",
      title: "Research",
      description:
        "User research helps you to create an optimal product for users.",
      status: "todo",
      priority: "High",
      category: "Work",
      assignees: [{ avatar: "/avatars/a3.png" }],
      comments: 10,
      files: 3,
    },
    "3": {
      id: "3",
      title: "Wireframes",
      description:
        "Low fidelity wireframes include the most basic content and visuals.",
      status: "inprogress",
      priority: "Low",
      category: "Design",
      assignees: [
        { avatar: "/avatars/a1.png" },
        { avatar: "/avatars/a4.png" },
      ],
      comments: 8,
      files: 1,
    },
    "4": {
      id: "4",
      title: "Design System",
      description: "It just needs to adapt the UI from what you did before.",
      status: "done",
      priority: "Completed",
      category: "Design",
      assignees: [{ avatar: "/avatars/a2.png" }],
      comments: 5,
      files: 2,
    },
  },
};


const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const t = action.payload;
        state.tasks[t.id] = t;
      },
      prepare({ title, description, priority = 'Low', category = 'General', dueDate = null, status = 'todo' }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            priority,
            category,
            dueDate,
            status,
            createdAt: new Date().toISOString()
          }
        };
      }
    },
    updateTask(state, action) {
      const { id, changes } = action.payload;
      if (state.tasks[id]) state.tasks[id] = { ...state.tasks[id], ...changes };
    },
    deleteTask(state, action) {
      delete state.tasks[action.payload];
    },
    moveTask(state, action) {
      const { id, status } = action.payload;
      if (state.tasks[id]) state.tasks[id].status = status;
    },
    bulkSet(state, action) {
      state.tasks = action.payload || {};
    }
  }
});

export const { addTask, updateTask, deleteTask, moveTask, bulkSet } = tasksSlice.actions;
export default tasksSlice.reducer;