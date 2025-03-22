import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { NotificationIcon } from "@/components/notifications/NotificationIcon";
import { NotificationProvider } from "@/context/NotificationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings, User, Moon, Sun, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function MainLayout() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  // Check for dark mode preference
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true" || localStorage.getItem("darkMode") === null;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] animate-spin rounded-full border-4 border-blue-400 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          </div>
          <p className="text-sm font-medium text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const mainContentClass = cn(
    "flex flex-1 flex-col transition-all duration-300 ease-in-out w-full",
    isMobile ? (isCollapsed ? "ml-0" : "ml-0") : (isCollapsed ? "ml-[70px]" : "ml-[240px]"),
    "max-w-full"
  );

  return (
    <NotificationProvider>
      <div className={cn("flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-slate-900 transition-colors duration-300", isDarkMode ? "dark" : "")}>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        
        <div className={mainContentClass}>
          <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-blue-200/30 dark:border-blue-800/30 bg-gradient-to-r from-blue-50/90 to-sky-100/90 dark:from-blue-900/90 dark:to-sky-900/90 backdrop-blur-md px-4 shadow-md relative overflow-hidden">
            {/* 3D Effect Elements for header */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-[100%] -right-[20%] w-[70%] h-[150%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
              <div className="absolute -bottom-[100%] -left-[20%] w-[70%] h-[150%] rounded-full bg-sky-200/40 dark:bg-sky-400/10 blur-3xl"></div>
              <div className="absolute top-[20%] left-[10%] w-[15%] h-[35%] rounded-full bg-white/50 dark:bg-white/5 blur-xl"></div>
            </div>
            
            <div className="flex items-center relative z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-100/50 dark:hover:bg-blue-800/50" 
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex-1 max-w-xs hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <Input 
                    type="search" 
                    placeholder="Search..." 
                    className="pl-8 rounded-md border-blue-200 dark:border-blue-700 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 placeholder:text-slate-500 focus-visible:ring-blue-500/50 w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode} 
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-100/50 dark:hover:bg-blue-800/50 animate-fade-in"
              >
                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <NotificationIcon />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 relative overflow-hidden border border-blue-200 dark:border-blue-700 hover:bg-blue-100/50 dark:hover:bg-blue-800/50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600/20 text-blue-700 dark:text-blue-400 text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 mt-1 p-2 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 shadow-xl rounded-lg animate-fade-in">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{user?.name || "User"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email || ""}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-blue-200/50 dark:bg-blue-800/50" />
                  <DropdownMenuItem 
                    onClick={() => navigate("/profile")}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-100/50 dark:hover:bg-blue-800/50 hover:text-slate-900 dark:hover:text-white"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate("/settings")}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-100/50 dark:hover:bg-blue-800/50 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-blue-200/50 dark:bg-blue-800/50" />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto bg-3d-blue w-full h-full">
            <div className="w-full h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}
