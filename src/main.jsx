import React from 'react'
import ReactDOM from 'react-dom/client'
import Chat from './Chat.jsx'
import Home from './pages/Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/chatbox",
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
