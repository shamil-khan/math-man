import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'inversify-react';
import container from './DIRegistration';
import App from './App';
import Layout from './DashboardLayout';
import HomePage from './pages/_home-page';
import AdditionPage from './pages/addition-page';
import SubtractionPage from './pages/subtraction-page';
import MultiplicationPage from './pages/multiplication-page';
import DivisionPage from './pages/division-page';
import TablePage from './pages/table-page';
import SquareValuePage from './pages/square-value-page';
import CubicValuePage from './pages/cubic-value-page';
import SquareRootPage from './pages/square-root-page';
import CubicRootPage from './pages/cubic-root-page';

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: HomePage,
          },
          {
            path: 'addition-page',
            Component: AdditionPage,
          },
          {
            path: 'Subtraction-page',
            Component: SubtractionPage,
          },
          {
            path: 'multiplication-page',
            Component: MultiplicationPage,
          },
          {
            path: 'division-page',
            Component: DivisionPage,
          },
          {
            path: 'table-page',
            Component: TablePage,
          },
          {
            path: 'square-value-page',
            Component: SquareValuePage,
          },
          {
            path: 'cubic-value-page',
            Component: CubicValuePage,
          },
          {
            path: 'square-root-page',
            Component: SquareRootPage,
          },
          {
            path: 'cubic-root-page',
            Component: CubicRootPage,
          },
        ],
      },
    ],
  },
]);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <Provider container={container}>
      {/* <React.StrictMode> */}
      <RouterProvider router={router} />
      {/* </React.StrictMode> */}
    </Provider>,
  );
}
