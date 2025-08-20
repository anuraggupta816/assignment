import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import TransactionsPage from "./pages/TransactionsPage";

// Private Route wrapper
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Layout component with Tailwind header
function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  // Map paths to titles
  const pageTitles: Record<string, string> = {
    "/": "Dashboard Overview",
    "/investments": "Investments",
    "/transactions": "Transactions",
    "/login": "Login",
  };
  const title = pageTitles[location.pathname] || "Portfolio Dashboard";

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-100 flex flex-col sm:flex-row items-center justify-between px-6 py-4 shadow-md sticky top-0">
        <h2 className="text-xl font-semibold text-blue-900 flex-1 mb-2 sm:mb-0">
          {title}
        </h2>

        {/* Navigation */}
        <nav className="flex gap-4">
          <Link
            to="/"
            className="text-blue-900 hover:text-blue-700 font-medium"
          >
            Overview
          </Link>
          <Link
            to="/investments"
            className="text-blue-900 hover:text-blue-700 font-medium"
          >
            Investments
          </Link>
          <Link
            to="/transactions"
            className="text-blue-900 hover:text-blue-700 font-medium"
          >
            Transactions
          </Link>
        </nav>

        {/* Logout Button */}
        {user && (
          <button
            onClick={logout}
            className="mt-2 sm:mt-0 ml-0 sm:ml-4 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          >
            Logout
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/investments"
          element={
            <PrivateRoute>
              <Layout>
                <InvestmentsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Layout>
                <TransactionsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
