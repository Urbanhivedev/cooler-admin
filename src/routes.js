import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';
import CViewJob from './pages/CViewJobs';
import CUpdateJob from './pages/CUpdateJob';
import ViewCooler from './pages/ViewCoolers';
import UpdateCooler from './pages/UpdateCooler';
import ViewAllCoolers from './pages/ViewAllCoolers';
import CoolersPage from './pages/CoolersPage';
import MyCoolersPage from './pages/MyCoolersPage';
import PublicCoolerPage from './pages/PublicCoolerPage';
import PrivateCoolerPage from './pages/PrivateCoolerPage';
import MembersPage from './pages/MembersPage';
import CreateCoolerPage from './pages/CreateCoolerPage';
import PublicCoolerJoin from './pages/PublicCoolerJoin';
import PrivateCoolerJoin from './pages/PrivateCoolerJoin';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        // { element: <Navigate to="/dashboard/app" />, index: true },
        // { path: 'home', element: <DashboardAppPage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'view-users/:id', element: <CViewJob /> },
        { path: 'update-users/:id', element: <CUpdateJob /> },
        { path: 'public-cooler', element: <PublicCoolerPage /> },
        { path: 'private-cooler', element: <PrivateCoolerPage /> },
        { path: 'members', element: <MembersPage /> },
        { path: 'join-public-cooler', element: <PublicCoolerJoin /> },
        { path: 'join-private-cooler', element: <PrivateCoolerJoin /> },
        { path: 'create-cooler', element: <ViewAllCoolers /> },
        { path: 'view-coolers/:id', element: <ViewCooler /> },
        { path: 'update-coolers/:id', element: <UpdateCooler /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
