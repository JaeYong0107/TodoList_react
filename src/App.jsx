import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout.jsx';
import Main from './pages/Main.jsx';
import TodoDetail from './pages/TodoDetail.jsx';
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Main /> },
        { path: 'detail', element: <TodoDetail /> }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
