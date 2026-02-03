import { useMemo, useEffect, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FiCheckCircle, FiClock, FiAlertCircle, FiList } from 'react-icons/fi';
import { gsap } from 'gsap';

const StatsDashboard = () => {
  const { tasks } = useTaskContext();
  const statsRef = useRef([]);

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedCount = tasks.filter((t) => t.status === 'Completed').length;
    const inReviewCount = tasks.filter((t) => t.status === 'In Review').length;
    const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
    const todoCount = tasks.filter((t) => t.status === 'To Do').length;

    return {
      totalTasks,
      completedCount,
      inReviewCount,
      pendingCount,
      todoCount,
    };
  }, [tasks]);

  useEffect(() => {
    statsRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, [stats]);

  const chartData = [
    { name: 'Completed', value: stats.completedCount, color: '#10b981' },
    { name: 'In Review', value: stats.inReviewCount, color: '#8b5cf6' },
    { name: 'Pending', value: stats.pendingCount, color: '#f59e0b' },
    { name: 'To Do', value: stats.todoCount, color: '#ef4444' },
  ].filter((item) => item.value > 0);

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: FiList,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: stats.completedCount,
      icon: FiCheckCircle,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'In Review',
      value: stats.inReviewCount,
      icon: FiClock,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'Pending',
      value: stats.pendingCount,
      icon: FiAlertCircle,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            ref={(el) => (statsRef.current[index] = el)}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.textColor} p-4 rounded-full`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Task Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;
