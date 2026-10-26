import { Navigate, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Groups from './pages/Groups';
import GroupTasks from './pages/GroupTasks';
import Guide from './pages/Guide';
import Developers from './pages/Developers';
import NotFound from './pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<GroupTasks />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TaskProvider>
  );
}
