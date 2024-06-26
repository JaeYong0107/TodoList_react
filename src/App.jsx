import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout, { loader as rootLoader } from './pages/RootLayout.jsx';
import Main, { loader as mainLoader } from './pages/Main.jsx';
import TodoDetail, { loader as detailLoader } from './pages/TodoDetail.jsx';
import TodoEdit from './pages/TodoEdit.jsx';
import TodoNew from './pages/TodoNew.jsx';
import './App.css'
import Error from './components/Error/Error.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <Error />,
      element: <RootLayout />,
      loader: rootLoader,
      children: [
        {
          index: true,
          element: <Main />,
          loader: mainLoader,
        },
        {
          path: ':itemId',
          id: 'current-item',
          loader: detailLoader,
          children: [
            {
              index: true,
              element: <TodoDetail />,
            },
            { path: 'edit', element: <TodoEdit /> }
          ],
        },
        { path: 'new', element: <TodoNew /> }, // 이거는 새로운 item을 만드는 화면인데, 그러면 new로 만들어줘야할까?
      ]                                          // 화면구성은 똑같이 가져가고 싶은데 뭐가 효율적일까?
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
