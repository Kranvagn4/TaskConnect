import { useLocation } from 'react-router-dom';
import TaskTable from '../components/TaskTable';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import TaskForm from '../components/TaskForm';

const TaskView = () => {
  const location = useLocation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Determine which filter to apply based on the route
  const getFilterConfig = () => {
    const path = location.pathname;

    if (path.includes('todo')) {
      return { status: 'To Do', title: 'To Do Tasks', color: 'yellow' };
    }
    if (path.includes('in-review')) {
      return { status: 'In Review', title: 'In Review Tasks', color: 'purple' };
    }
    if (path.includes('pending')) {
      return { status: 'Pending', title: 'Pending Tasks', color: 'orange' };
    }
    if (path.includes('completed')) {
      return { status: 'Completed', title: 'Completed Tasks', color: 'green' };
    }
    if (path.includes('past-deadline')) {
      return { status: null, title: 'Past Deadline Tasks', color: 'red', isPastDeadline: true };
    }

    return { status: null, title: 'All Tasks', color: 'blue' };
  };

  const config = getFilterConfig();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{config.title}</h1>
          <p className="text-gray-600 mt-1">
            View and manage your {config.title.toLowerCase()}
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-medium"
        >
          <FiPlus className="text-xl" />
          Add Task
        </button>
      </div>

      {/* Task Table */}
      <TaskTable
        filterStatus={config.status}
        isPastDeadline={config.isPastDeadline || false}
      />

      {/* Task Form Modal */}
      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default TaskView;
