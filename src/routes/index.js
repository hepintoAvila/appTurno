import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Queryform = React.lazy(() => import('../pages/dashboard/configuracion/ModulosPrincipales'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreenInicio = React.lazy(() => import('../pages/dashboard/Project/ModuloActas/Componentes/CambiarPassword'));
const ProjectDashboard = React.lazy(() => import('../pages/dashboard/configuracion/ModulosPrincipales'));
const BtnIniciales = React.lazy(() => import('../pages/dashboard/configuracion/BtnIniciales'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/project" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'sx',
    children: [
        {
            path: '/dashboard/project',
            name: 'Project',
            component: ProjectDashboard,
            route: PrivateRoute,
        },
        {
          path: '/dashboard/lock-screen',
          name: 'Project',
          component: LockScreenInicio,
          route: PrivateRoute,
      },

    ],
};





// pages



// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

//SOLICITUDES
const moduloSolicitudComiteRoutes = [
  {
      path: '/ModuloSolicitudComite/Queryform',
      name: 'Queryform',
      component: Queryform,
      route: Route,
  },
]



// auth
const authRoutes = [
    {
        path: '/account/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes,];
const publicRoutes = [...authRoutes,...moduloSolicitudComiteRoutes];
const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
