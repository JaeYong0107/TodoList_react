import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout.jsx';
import Main from './pages/Main.jsx';
import TodoDetail from './pages/TodoDetail.jsx';
import TodoEdit from './pages/TodoEdit.jsx';
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Main /> },
        {
          path: ':itemId',
          children: [
            { index: true, element: <TodoDetail /> },
            { path: 'edit', element: <TodoEdit /> }
          ],
        },
        { path: 'new', element: <TodoEdit /> }, // 이거는 새로운 item을 만드는 화면인데, 그러면 new로 만들어줘야할까?
      ]                                          // 화면구성은 똑같이 가져가고 싶은데 뭐가 효율적일까?
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
