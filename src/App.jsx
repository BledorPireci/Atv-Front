import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout.jsx'
import Home from './pages/Home/Home.jsx'
import ATVs from './pages/ATVs/ATVs.jsx'
import Contact from './pages/Contact/Contact.jsx'
import TermsPage from './pages/TermsPage/TermsPage.jsx'
import AdminPanel from './pages/Admin/AdminPanel.jsx'
import Login from './pages/Login/Login.jsx'
import Debug from './pages/Debug.jsx'
import ProtectedRoute from './pages/Admin/components/ProtectedRoute'
import './styles/main.css'

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/atv', element: <ATVs /> },
      { path: '/contact', element: <Contact /> },
      { path: '/terms', element: <TermsPage /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/debug',
    element: <Debug />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
