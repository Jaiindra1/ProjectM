import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import Board from "../components/Board";
import AddTaskModal from "../components/AddTaskModal";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    priority: "All",
    search: "",
  });

  return (
    <main className="p-6 w-full">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Mobile App</h1>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 border rounded-full flex items-center gap-2"
            >
              <span className="text-indigo-600 font-medium">+ Invite</span>
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-full"
            >
              Share
            </button>
          </div>
        </div>
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onAdd={() => setModalOpen(true)}
        />
        <Board filters={filters} />
      </div>
      <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
