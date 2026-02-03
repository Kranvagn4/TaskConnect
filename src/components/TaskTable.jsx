import { useState, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { FiEdit2, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import TaskForm from './TaskForm';

const TaskTable = ({ filterStatus = null, isPastDeadline = false }) => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (isPastDeadline) {
      const now = new Date();
      filtered = tasks.filter(
        (task) =>
          new Date(task.deadline) < now && task.status !== 'Completed'
      );
    } else if (filterStatus) {
      filtered = tasks.filter((task) => task.status === filterStatus);
    }

    return filtered;
  }, [tasks, filterStatus, isPastDeadline]);

  // Sort tasks
  const sortedTasks = useMemo(() => {
    if (!sortConfig.key) return filteredTasks;

    const sorted = [...filteredTasks].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === 'priority') {
        return sortConfig.direction === 'asc'
          ? a.priority - b.priority
          : b.priority - a.priority;
      }
      return 0;
    });

    return sorted;
  }, [filteredTasks, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">High</span>;
      case 2:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Medium</span>;
      case 3:
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Low</span>;
      default:
        return priority;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <FiArrowUp className="opacity-30" />;
    return sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Task Name
                    <SortIcon columnKey="name" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('priority')}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Priority
                    <SortIcon columnKey="priority" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Assigned Time
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Deadline
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No tasks found. Add a new task to get started!
                  </td>
                </tr>
              ) : (
                sortedTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {task.name}
                    </td>
                    <td className="px-6 py-4">{getPriorityLabel(task.priority)}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(task.assignTime)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(task.deadline)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Review">In Review</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Task"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Task"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        taskToEdit={taskToEdit}
      />
    </>
  );
};

export default TaskTable;
