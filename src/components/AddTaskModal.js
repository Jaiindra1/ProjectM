import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/tasksSlice';

export default function AddTaskModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('General');
  const [status, setStatus] = useState('todo');

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title: title.trim(), description: desc.trim(), priority, category, status }));
    setTitle(''); setDesc('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <form className="bg-white p-6 rounded-lg w-[420px]" onSubmit={submit}>
        <h3 className="text-lg font-semibold mb-3">Add Task</h3>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded mb-2" />
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-2 rounded mb-2" />
        <div className="flex gap-2 mb-3">
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="border p-2 rounded flex-1">
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 rounded flex-1">
            <option>General</option><option>Work</option><option>Personal</option><option>Urgent</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="border p-2 rounded">
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}