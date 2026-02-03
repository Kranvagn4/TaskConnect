import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import { TaskProvider } from './context/TaskContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import NotificationWatcher from './components/NotificationWatcher';
import Home from './pages/Home';
import TaskView from './pages/TaskView';
import Notifications from './pages/Notifications';
import TimeTracking from './pages/TimeTracking';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 ml-64 p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks/todo" element={<TaskView />} />
              <Route path="/tasks/in-review" element={<TaskView />} />
              <Route path="/tasks/pending" element={<TaskView />} />
              <Route path="/tasks/completed" element={<TaskView />} />
              <Route path="/tasks/past-deadline" element={<TaskView />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/time-tracking" element={<TimeTracking />} />
            </Routes>
          </div>

          {/* Toast Notifications */}
          <ToastContainer />

          {/* Notification Watcher */}
          <NotificationWatcher />
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
