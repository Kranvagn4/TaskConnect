import { useLocalStorage } from '../hooks/useLocalStorage';
import { FiBell, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

const Notifications = () => {
  const [notificationLog, setNotificationLog] = useLocalStorage('notifications_log', []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const clearNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotificationLog([]);
    }
  };

  const deleteNotification = (id) => {
    setNotificationLog((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    if (type === 'past-deadline') {
      return <FiAlertTriangle className="text-red-500 text-2xl" />;
    }
    return <FiBell className="text-yellow-500 text-2xl" />;
  };

  const getNotificationColor = (type) => {
    if (type === 'past-deadline') {
      return 'border-l-red-500 bg-red-50';
    }
    return 'border-l-yellow-500 bg-yellow-50';
  };

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...notificationLog].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600 mt-1">
            View all your task notifications and alerts
          </p>
        </div>
        {notificationLog.length > 0 && (
          <button
            onClick={clearNotifications}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200 font-medium"
          >
            <FiTrash2 />
            Clear All
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {sortedNotifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FiBell className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No notifications yet</p>
            <p className="text-gray-400 text-sm mt-2">
              You'll see task deadline alerts here
            </p>
          </div>
        ) : (
          sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${getNotificationColor(
                notification.type
              )} hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-1">
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(notification.timestamp)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-4"
                  title="Delete notification"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
