import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, Code2, LogOut, LayoutDashboard, Plus } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8" />
            <span className="font-bold text-xl tracking-tighter">DevStash</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/tools" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
              Tools
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-input transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/create" className="flex items-center space-x-2 text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
                   <Plus className="h-4 w-4" />
                   <span>New</span>
                </Link>
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-border">
                  <span className="text-sm text-gray-500">{user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
