import React, { useState, useEffect } from 'react';
import Column from './Column';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateTask } from '../redux/slices/tasksSlice';

const statusOrder = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'On Progress' },
  { id: 'done', title: 'Done' }
];

export default function Board({ filters }) {
  const tasksObj = useSelector((s) => s.tasks.tasks);
  const dispatch = useDispatch();
  const tasksList = Object.values(tasksObj || {});

  // Track column highlight
  const [highlightColumn, setHighlightColumn] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const destColumn = destination.droppableId;
    dispatch(updateTask({ id: draggableId, changes: { status: destColumn } }));
    setHighlightColumn(destColumn);
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, changes: { status: newStatus } }));
    setHighlightColumn(newStatus);
  };

  // Clear highlight after 1.5s
  useEffect(() => {
    if (highlightColumn) {
      const timer = setTimeout(() => setHighlightColumn(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightColumn]);

  const applyFilters = (items) => {
    return items.filter(t => {
      if (!t) return false;
      if (filters.category && filters.category !== 'All' && t.category !== filters.category) return false;
      if (filters.priority && filters.priority !== 'All' && t.priority !== filters.priority) return false;
      if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {statusOrder.map(col => (
          <Column
            key={col.id}
            column={col}
            tasks={applyFilters(tasksList.filter(t => t.status === col.id))}
            highlight={highlightColumn === col.id}
            onStatusChange={handleStatusChange} // pass down for TaskCard dropdown
          />
        ))}
      </div>
    </DragDropContext>
  );
}
