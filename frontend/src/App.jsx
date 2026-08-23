import { createBrowserRouter, RouterProvider } from 'react-router';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ProjectCaseStudy from './pages/ProjectCaseStudy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'work',
        element: <Work />,
      },
      {
        path: 'work/:slug',
        element: <ProjectCaseStudy />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;