import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { label: "Home", to: "/", Icon: HomeIcon },
  { label: "Messages", to: "/messages", Icon: ChatBubbleLeftEllipsisIcon },
  { label: "Tasks", to: "/tasks", Icon: ClipboardDocumentListIcon },
  { label: "Members", to: "/members", Icon: UserGroupIcon },
  
  { label: "Settings", to: "/settings", Icon: Cog6ToothIcon },
];

export default function Sidebar({ initialActive } = {}) {
  const location = (() => {
    try {
      return useLocation();
    } catch (e) {
      return null;
    }
  })();

  const [localActive, setLocalActive] = useState(initialActive || "Home");

  const getActive = (item) => {
    if (location && location.pathname) {
      return item.to === (location.pathname === "/" ? "/" : location.pathname);
    }
    return item.label === localActive;
  };

  return (
    <aside className="w-72 bg-white border-r-2 border-gray-250 min-h-screen flex flex-col">
      <div className="p-5 pt-5 font-bold text-xl border-b-2 border-gray-300">Project M.</div>
      <nav className="flex-1 px-5 pt-4 text-gray-600">
        <ul className="space-y-2">
          {menuItems.map(({ label, Icon, to }) => {
            const active = getActive({ label, to });
            return (
              <div key={label}>
                {location ? (
                  <Link
                    to={to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      active
                        ? "bg-purple-50 text-purple-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <span>{label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setLocalActive(label)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition ${
                      active
                        ? "bg-purple-50 text-purple-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <span>{label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </ul>

        <h4 className="mt-6 text-xs uppercase text-gray-400">My Projects</h4>
        <ul className="mt-2 space-y-2">
          {["Mobile App", "Website Redesign", "Design System", "Wireframes"].map(
            (proj, i) => (
              <li
                key={proj}
                className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between ${
                  i === 0
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === 0 ? "bg-indigo-500" : "bg-gray-300"
                    }`}
                  />
                  <span>{proj}</span>
                </div>
                {i === 0 && (
                  <span className="text-xs text-gray-400">...</span>
                )}
              </li>
            )
          )}
        </ul>
      </nav>

      <div className="m-4 bg-indigo-50 rounded-xl p-4 text-sm">
        <h4 className="font-medium mb-2">Thoughts Time</h4>
        <p className="text-gray-500 text-xs mb-2">
          We don’t have any notice for you, till then you can share your
          thoughts.
        </p>
        <button className="w-full py-2 bg-white border rounded-md text-indigo-600">
          Write a message
        </button>
      </div>
    </aside>
  );
}
