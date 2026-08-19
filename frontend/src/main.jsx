import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Careers from './pages/Careers';
import Pricing from './pages/Pricing';
import BlogPage from './pages/BlogPage';
import './index.css';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/blog",
    Component: Blog,
  },
  {
    path: "/careers",
    Component: Careers,
  },
  {
    path: "/pricing",
    Component: Pricing,
  },
  {
    path: "/blog-page",
    Component: BlogPage,
  }
])

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);