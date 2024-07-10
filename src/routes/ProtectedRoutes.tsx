import { ThemeSettings, useAuthContext, useThemeContext } from '@/common';
import { lazy } from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import VerticalLayout from '@/layouts/Vertical';
import HorizontalLayout from '@/layouts/Horizontal';
import Root from './Root';

/**
 * routes import
 */
const Dashboard = lazy(() => import('../pages/dashboard'));

export default function ProtectedRoutes() {
	const { settings } = useThemeContext();
	const Layout =
		settings.layout.type == ThemeSettings.layout.type.vertical
			? VerticalLayout
			: HorizontalLayout;

	const { user } = useAuthContext();

	return user ? (
		<ReactRoutes>
			<Route path="/*" element={<Layout />}>
				<Route index element={<Root />} />
				<Route path="dashboard/*" element={<Dashboard />} />
			</Route>
		</ReactRoutes>
	) : (
		<Navigate to="/account/login" replace />
	);
}
