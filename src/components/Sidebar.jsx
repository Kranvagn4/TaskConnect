import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiBell, FiClock, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { gsap } from 'gsap';

const Sidebar = () => {
  const [tasksOpen, setTasksOpen] = useState(true);
  const taskMenuRef = useRef(null);

  useEffect(() => {
    if (taskMenuRef.current) {
      if (tasksOpen) {
        gsap.to(taskMenuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(taskMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [tasksOpen]);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-blue-100 text-blue-600 font-semibold shadow-sm'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  const subLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 ml-6 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? 'bg-blue-50 text-blue-600 font-medium'
        : 'text-gray-600 hover:bg-gray-50'
    }`;

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Task<span className="text-blue-600">Connect</span>
        </h1>

        <nav className="space-y-2">
          {/* Home Link */}
          <NavLink to="/" className={linkClasses}>
            <FiHome className="text-xl" />
            <span>Home</span>
          </NavLink>

          {/* Tasks Collapsible Section */}
          <div>
            <button
              onClick={() => setTasksOpen(!tasksOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <FiCheckSquare className="text-xl" />
                <span className="font-medium">Tasks</span>
              </div>
              {tasksOpen ? <FiChevronDown /> : <FiChevronRight />}
            </button>

            <div ref={taskMenuRef} className="overflow-hidden">
              <div className="mt-1 space-y-1">
                <NavLink to="/tasks/todo" className={subLinkClasses}>
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>To Do</span>
                </NavLink>
                <NavLink to="/tasks/in-review" className={subLinkClasses}>
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>In Review</span>
                </NavLink>
                <NavLink to="/tasks/pending" className={subLinkClasses}>
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Pending</span>
                </NavLink>
                <NavLink to="/tasks/completed" className={subLinkClasses}>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Completed</span>
                </NavLink>
                <NavLink to="/tasks/past-deadline" className={subLinkClasses}>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Past Deadline</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Notifications Link */}
          <NavLink to="/notifications" className={linkClasses}>
            <FiBell className="text-xl" />
            <span>Notifications</span>
          </NavLink>

          {/* Time Tracking Link */}
          <NavLink to="/time-tracking" className={linkClasses}>
            <FiClock className="text-xl" />
            <span>Time Tracking</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
