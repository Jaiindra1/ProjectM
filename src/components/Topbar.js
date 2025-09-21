import React from "react";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function Topbar() {
  return (
    <header className="bg-white border-b-2 border-gray-300">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full border rounded-md px-4 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-4 ml-6">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <BellIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <p className="font-medium">Palak Jain</p>
              <p className="text-gray-500 text-xs">Rajasthan, India</p>
            </div>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
