import { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

const NotificationWatcher = () => {
  const { tasks } = useTaskContext();
  const [notificationLog, setNotificationLog] = useLocalStorage('notifications_log', []);

  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      tasks.forEach((task) => {
        if (task.status === 'Completed') return;

        const deadline = new Date(task.deadline);
        const deadlineDate = new Date(
          deadline.getFullYear(),
          deadline.getMonth(),
          deadline.getDate()
        );

        const notificationKey = `${task.id}-${deadlineDate.toISOString()}`;

        // Check if notification already sent
        const alreadyNotified = notificationLog.some(
          (log) => log.notificationKey === notificationKey
        );

        if (alreadyNotified) return;

        // Task due today
        if (deadlineDate.getTime() === today.getTime()) {
          toast.warn(`Task is due today: ${task.name}`, {
            position: 'top-right',
            autoClose: 5000,
          });

          setNotificationLog((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              notificationKey,
              taskId: task.id,
              taskName: task.name,
              type: 'due-today',
              message: `Task is due today: ${task.name}`,
              timestamp: now.toISOString(),
            },
          ]);
        }
        // Task past deadline
        else if (deadlineDate < today) {
          toast.error(`Task is past deadline: ${task.name}`, {
            position: 'top-right',
            autoClose: 5000,
          });

          setNotificationLog((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              notificationKey,
              taskId: task.id,
              taskName: task.name,
              type: 'past-deadline',
              message: `Task is past deadline: ${task.name}`,
              timestamp: now.toISOString(),
            },
          ]);
        }
      });
    };

    // Check immediately
    checkDeadlines();

    // Check every minute
    const interval = setInterval(checkDeadlines, 60000);

    return () => clearInterval(interval);
  }, [tasks, notificationLog, setNotificationLog]);

  return null;
};

export default NotificationWatcher;
