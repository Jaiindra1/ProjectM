import React from 'react';

export default function FilterBar({ filters, setFilters, onAdd }) {
  return (
    <div className="bg-white p-4 rounded-md shadow mb-4 flex items-center gap-4">
      <input
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search tasks..."
        className="border p-2 rounded flex-1 max-w-xs" // flex but max width

      />

      <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="border p-2 rounded">
        <option>All</option>
        <option>General</option>
        <option>Work</option>
        <option>Personal</option>
        <option>Urgent</option>
      </select>

      <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="border p-2 rounded">
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={onAdd} className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded">+ Add Task</button>
    </div>
  );
}