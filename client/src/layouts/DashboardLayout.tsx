import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code2, 
  Wrench, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Activity, 
  BarChart3, 
  Boxes,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative overflow-hidden",
      active 
        ? "bg-foreground text-background" 
        : "text-gray-500 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    <Icon className={cn("h-5 w-5 z-10", active ? "text-background" : "text-gray-500 group-hover:text-foreground")} />
    <span className="font-medium z-10">{label}</span>
    {active && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute inset-0 bg-foreground z-0"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Code2, label: 'Snippets', href: '/snippets' },
    { icon: Boxes, label: 'Assets', href: '/assets' },
    { icon: Wrench, label: 'Tools', href: '/tools' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Activity, label: 'Activity', href: '/activity' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/95 flex">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden pb-safe"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-foreground text-background p-1.5 rounded-lg">
                <Zap className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">DevStash</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="mb-6 px-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Workspace</h2>
            {navItems.slice(0, 3).map((item) => (
              <SidebarItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
              />
            ))}
          </div>

          <div className="mb-6 px-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Utilities</h2>
            {navItems.slice(3, 5).map((item) => (
              <SidebarItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
              />
            ))}
          </div>

          <div className="px-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</h2>
             {navItems.slice(5).map((item) => (
              <SidebarItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 mb-4">
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                 {user?.username?.charAt(0).toUpperCase()}
             </div>
             <div className="flex-1 min-w-0">
                 <p className="text-sm font-medium truncate">{user?.username}</p>
                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
             </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 w-full px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-background border-b border-border flex items-center justify-between px-4">
            <button onClick={() => setIsMobileOpen(true)}>
                <Menu className="h-6 w-6" />
            </button>
            <span className="font-bold">DevStash</span>
            <div className="w-6" /> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
