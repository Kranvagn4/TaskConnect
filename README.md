# TaskConnect - Task Management Dashboard

A modern, feature-rich task management application built with React.js. This single-page application (SPA) helps you organize, track, and manage your tasks efficiently with a beautiful, responsive UI.

## 🚀 Features

- **Task Management**: Create, edit, update, and delete tasks
- **Multiple Task Views**: Filter tasks by status (To Do, In Review, Pending, Completed, Past Deadline)
- **Priority System**: Assign priorities (High, Medium, Low) to tasks
- **Smart Notifications**: Automatic deadline alerts and reminders
- **Statistics Dashboard**: Visual representation of task distribution with charts
- **Sorting & Filtering**: Sort tasks by name and priority
- **Local Storage Persistence**: All data saved in browser localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS v4 for a clean, professional look
- **Smooth Animations**: Enhanced user experience with GSAP animations

## 🛠️ Tech Stack

- **Framework**: React.js 19.1.1
- **Routing**: react-router-dom
- **Styling**: Tailwind CSS v4
- **Notifications**: react-toastify
- **Charts**: recharts
- **Icons**: react-icons
- **Animations**: GSAP
- **Unique IDs**: uuid
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskconnect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx              # Navigation sidebar
│   ├── TaskTable.jsx            # Task list table with sorting
│   ├── TaskForm.jsx             # Modal form for add/edit tasks
│   ├── StatsDashboard.jsx       # Statistics cards and chart
│   └── NotificationWatcher.jsx  # Background notification checker
├── pages/
│   ├── Home.jsx                 # Main dashboard page
│   ├── TaskView.jsx             # Filtered task views
│   ├── Notifications.jsx        # Notification history
│   └── TimeTracking.jsx         # Time tracking (placeholder)
├── context/
│   └── TaskContext.jsx          # Global task state management
├── hooks/
│   └── useLocalStorage.js       # Custom localStorage hook
├── App.jsx                      # Main app component with routing
├── main.jsx                     # App entry point
└── index.css                    # Global styles
```

## 🎯 Usage

### Adding a Task
1. Click the "Add Task" button on the dashboard
2. Fill in task name, priority, and deadline
3. Click "Add Task" to save

### Managing Tasks
- **Edit**: Click the edit icon in the actions column
- **Delete**: Click the trash icon to remove a task
- **Update Status**: Use the status dropdown directly in the table
- **Sort**: Click on "Task Name" or "Priority" headers to sort

### Viewing Filtered Tasks
Use the sidebar navigation to view tasks by specific status:
- To Do
- In Review
- Pending
- Completed
- Past Deadline

### Notifications
- Automatic alerts for tasks due today
- Alerts for tasks past their deadline
- View notification history in the Notifications page

## 📊 Task Data Structure

Each task contains:
```javascript
{
  id: "unique-uuid",           // Auto-generated
  name: "Task name",            // User input
  priority: 1,                  // 1=High, 2=Medium, 3=Low
  assignTime: "ISO-date",       // Auto-generated on creation
  deadline: "ISO-date",         // User input
  status: "To Do"              // To Do, In Review, Pending, Completed
}
```

## 🎨 Key Features Explained

### LocalStorage Persistence
- All tasks automatically saved to browser localStorage
- Data persists across browser sessions
- Custom hook (`useLocalStorage`) for reactive updates

### Smart Notifications
- Background process checks deadlines every minute
- Toast notifications for due/overdue tasks
- Notification log prevents duplicate alerts

### Task Statistics
- Real-time calculation of task counts
- Visual donut chart showing status distribution
- Stat cards with icon indicators

### Sorting & Filtering
- Sort by task name (alphabetically)
- Sort by priority (High to Low or vice versa)
- Filter by status or deadline conditions

## 🚀 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
Modify Tailwind CSS colors in the components to match your brand.

### Animation Duration
Adjust GSAP animation timings in component files.

### Notification Frequency
Change the interval in `NotificationWatcher.jsx` (default: 60000ms = 1 minute)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using React and modern web technologies

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
