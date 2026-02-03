import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SnippetEditor from './pages/SnippetEditor';
import Tools from './pages/Tools';
import Assets from './pages/Assets';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/create') || 
    location.pathname.startsWith('/edit') ||
    location.pathname.startsWith('/tools') ||
    location.pathname.startsWith('/assets') ||
    location.pathname.startsWith('/activity') ||
    location.pathname.startsWith('/settings') ||
    location.pathname.startsWith('/analytics') ||
    location.pathname.startsWith('/snippets');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {!isDashboardRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SnippetEditor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SnippetEditor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Tools />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Assets />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Activity />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         {/* Snippets list should be distinct from Overview */}
         <Route
          path="/snippets"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard /> 
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
