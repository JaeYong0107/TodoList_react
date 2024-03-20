import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import Main from './pages/Main';
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Main /> }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
