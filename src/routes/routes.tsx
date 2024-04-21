import { Navigate, createBrowserRouter } from 'react-router-dom';

import AddPage from '../pages/add-page';
import HomePage from '../pages/home-page/home-page';
import LayoutDefault from '../layouts/layout';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/admin" />,
	},
	{
		path: '/admin',
		element: <LayoutDefault />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/admin/add',
				element: <AddPage />,
			},
		],
	},
]);
