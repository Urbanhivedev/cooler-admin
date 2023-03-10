import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';
import CViewJob from './pages/CViewJobs';
import CUpdateJob from './pages/CUpdateJob';
import ViewCooler from './pages/ViewCoolers';
import UpdateCooler from './pages/UpdateCooler';
import TransferCooler from './pages/TransferCooler';
import ViewAllCoolers from './pages/ViewAllCoolers';
import CoolersPage from './pages/CoolersPage';
import MyCoolersPage from './pages/MyCoolersPage';
import PublicCoolerPage from './pages/PublicCoolerPage';
import PrivateCoolerPage from './pages/PrivateCoolerPage';
import MembersPage from './pages/MembersPage';
import CreateCoolerPage from './pages/CreateCoolerPage';
import PublicCoolerJoin from './pages/PublicCoolerJoin';
import PrivateCoolerJoin from './pages/PrivateCoolerJoin';

import CViewAllEmployers from './pages/CViewAllEmployers';
import CViewEmployer from './pages/CViewEmployer';
import CUpdateEmployer from './pages/CUpdateEmployer';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/login',
      
      element: <LoginPage />,
    },
    
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        // { element: <Navigate to="/dashboard/app" />, index: true },
        // { path: 'home', element: <DashboardAppPage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'home1', element: <HomePage /> },
        { path: 'home2', element: <HomePage /> },
        { path: 'view-users/:id', element: <CViewJob /> },
        { path: 'update-users/:id', element: <CUpdateJob /> },

        { path: 'employers', element: <CViewAllEmployers /> },
        { path: 'view-employers/:id', element: <CViewEmployer /> },
        { path: 'update-employers/:id', element: <CUpdateEmployer /> },
        
        { path: 'public-cooler', element: <PublicCoolerPage /> },
        { path: 'private-cooler', element: <PrivateCoolerPage /> },
        { path: 'members', element: <MembersPage /> },
        { path: 'join-public-cooler', element: <PublicCoolerJoin /> },
        { path: 'join-private-cooler', element: <PrivateCoolerJoin /> },
        { path: 'create-cooler', element: <ViewAllCoolers /> },
        { path: 'view-coolers/:id', element: <ViewCooler /> },
        { path: 'update-coolers/:id', element: <UpdateCooler /> },
        { path: 'transfer-coolers/:id', element: <TransferCooler /> },
      ],
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
