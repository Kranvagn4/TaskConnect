import { useState, useEffect, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { FiX } from 'react-icons/fi';
import { gsap } from 'gsap';

const TaskForm = ({ isOpen, onClose, taskToEdit = null }) => {
  const { addTask, updateTask } = useTaskContext();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    priority: 2,
    deadline: '',
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        name: taskToEdit.name,
        priority: taskToEdit.priority,
        deadline: taskToEdit.deadline.split('T')[0], // Extract date portion
      });
    } else {
      setFormData({
        name: '',
        priority: 2,
        deadline: '',
      });
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        onClose();
      },
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.deadline) {
      return;
    }

    const taskData = {
      name: formData.name.trim(),
      priority: parseInt(formData.priority),
      deadline: new Date(formData.deadline).toISOString(),
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask(taskData);
    }

    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {taskToEdit ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Task Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter task name"
            />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg shadow-blue-200"
            >
              {taskToEdit ? 'Update' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
