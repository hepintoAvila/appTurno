import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const TurnosDashboard = lazy(() => import('./Turnos/'));


export default function Dashboard() {
	return (
		<Routes>
			<Route path="/*" element={<Outlet />}>
				<Route path="turnos" element={<TurnosDashboard />} />
			</Route>
		</Routes>
	);
}
