import React from 'react'
import store from './state/redux/reduxStore.ts';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

// import App from './App.tsx'
import './index.css'
import './App.css'

import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import BookPage from './components/books/BookPage.tsx';
import NodePage from './components/nodes/NodePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/books/:name",
    element: <BookPage />
  },
  {
    path: "/nodes/:bookId/:nodeId",
    element: <NodePage />
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
