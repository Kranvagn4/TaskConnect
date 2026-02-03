import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  /**
   * Add a new task
   * @param {Object} taskData - The task data (name, priority, deadline)
   */
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      name: taskData.name,
      priority: taskData.priority,
      assignTime: new Date().toISOString(),
      deadline: taskData.deadline,
      status: 'To Do',
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success('Task Added!', {
      position: 'top-right',
      autoClose: 3000,
    });

    return newTask;
  };

  /**
   * Update an existing task
   * @param {string} taskId - The task ID
   * @param {Object} updatedData - The updated task data
   */
  const updateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
    toast.info('Task Updated!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  /**
   * Delete a task
   * @param {string} taskId - The task ID
   */
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.error('Task Deleted!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
