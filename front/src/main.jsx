import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ChatRoomEntry from './ChatRoomEntry.jsx';
import ChatRoom from './ChatRoom.jsx'

const router = createBrowserRouter(
 [
  {
    path: "/",
    element: <ChatRoomEntry />,
  },
  {
    path: "/:roomName",
    element: <ChatRoom />,
  },
 ]
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
