import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExpensesList from "./pages/ExpensesList.jsx";
import ExpenseForm from "./pages/ExpenseForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Ping from "./pages/Pings.jsx";


export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/ping", element: <Ping />},

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses",
    element: (
      <ProtectedRoute>
        <ExpensesList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses/new",
    element: (
      <ProtectedRoute>
        <ExpenseForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses/:id/edit",
    element: (
      <ProtectedRoute>
        <ExpenseForm />
      </ProtectedRoute>
    ),
  },
]);
