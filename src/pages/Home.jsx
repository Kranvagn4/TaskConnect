import { useState } from 'react';
import StatsDashboard from '../components/StatsDashboard';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';
import { FiPlus } from 'react-icons/fi';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-medium"
        >
          <FiPlus className="text-xl" />
          Add Task
        </button>
      </div>

      {/* Stats Dashboard */}
      <StatsDashboard />

      {/* Task Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Tasks</h2>
        <TaskTable />
      </div>

      {/* Task Form Modal */}
      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Home;
