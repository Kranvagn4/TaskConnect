import { useState, useMemo, useEffect } from 'react';
import { FiClock, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useTaskContext } from '../context/TaskContext';

const TimeTracking = () => {
  const { tasks } = useTaskContext();
  const [sortConfig, setSortConfig] = useState({ key: 'timeRemaining', direction: 'asc' });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Add useEffect for real-time updates
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const getTimeStatus = (deadline) => {
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - currentTime;
    const absTimeDiff = Math.abs(timeDiff);

    // Calculate all time components
    const days = Math.floor(absTimeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absTimeDiff % (1000 * 60)) / 1000);

    // Format hours, minutes, and seconds to always show two digits
    const formattedTime = `${days}-Days ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeDiff > 0) {
      return {
        text: `${formattedTime} remaining`,
        color: 'text-green-600',
        value: timeDiff // Use raw timeDiff for accurate sorting
      };
    } else {
      return {
        text: `${formattedTime} overdue`,
        color: 'text-red-600',
        value: timeDiff // Use raw timeDiff for accurate sorting
      };
    }
  };

  const sortedTasks = useMemo(() => {
    const incompleteTasks = tasks.filter(task => task.status !== 'Completed');
    return [...incompleteTasks].sort((a, b) => {
      const timeA = getTimeStatus(a.deadline).value;
      const timeB = getTimeStatus(b.deadline).value;
      return sortConfig.direction === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [tasks, sortConfig, currentTime]);

  const handleSort = () => {
    setSortConfig(prev => ({
      key: 'timeRemaining',
      direction: prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiClock className="text-blue-600" />
          Time Tracking
        </h1>
        <p className="text-gray-600 mt-2">
          Track time remaining or elapsed for your tasks
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={handleSort}
                >
                  <div className="flex items-center gap-1">
                    Time Status
                    {sortConfig.direction === 'asc' ? 
                      <FiArrowUp className="text-gray-400" /> : 
                      <FiArrowDown className="text-gray-400" />
                    }
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTasks.map((task) => {
                const timeStatus = getTimeStatus(task.deadline);
                return (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {task.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${timeStatus.color}`}>
                        {timeStatus.text}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
