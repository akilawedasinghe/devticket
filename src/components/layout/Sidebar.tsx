import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileText,
  UserCog,
  Settings,
  LogOut,
  BookOpen,
  User2,
  Bell,
  LucideIcon,
  Search,
  BarChart, // This was missing in the import
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

type NavItem = {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: number; // Made badge optional explicitly
  submenu?: NavItem[];
};

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if mobile on first load
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isCollapsed) {
        toggleSidebar();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const getLinksForRole = () => {
    const commonLinks: NavItem[] = [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        title: "Tickets",
        icon: FileText,
        href: "/tickets",
        badge: 5,
      },
      {
        title: "Knowledge Base",
        icon: BookOpen,
        href: "/knowledge",
      },
      {
        title: "Profile",
        icon: User2,
        href: "/profile",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ];
    
    // Removed the Chat link for admin and support roles
    
    if (user?.role === "admin") {
      return [
        ...commonLinks,
        {
          title: "User Management",
          icon: UserCog,
          href: "/users",
        },
        {
          title: "Analytics",
          icon: BarChart,
          href: "/analytics",
        },
      ];
    }
    
    return commonLinks;
  };
  
  const getDashboardLink = () => {
    switch (user?.role) {
      case "admin":
        return "/dashboard/admin";
      case "support":
        return "/dashboard/support";
      case "client":
      default:
        return "/dashboard/client";
    }
  };

  const getMappedLinks = () => {
    return links.map(link => {
      if (link.href === "/dashboard") {
        return { ...link, href: getDashboardLink() };
      }
      return link;
    });
  };

  const links = getLinksForRole();
  const mappedLinks = getMappedLinks();

  return (
    <div
      className={cn(
        "group fixed h-full flex flex-col border-r transition-all duration-300 z-30 bg-sidebar shadow-sm",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2 font-bold transition-all duration-300",
            isCollapsed && "opacity-0"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png" 
              alt="Symetrix Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="text-sidebar-foreground text-lg">symetrix360 Portal</span>
        </Link>
        <Link
          to="/"
          className={cn(
            "absolute left-4 flex items-center opacity-0 transition-all duration-300",
            isCollapsed && "opacity-100"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png" 
              alt="Symetrix Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="mt-4 px-2">
        <div className={cn(
          "relative flex items-center rounded-md bg-sidebar-accent/50 px-3 py-1.5 transition-all duration-300",
          isCollapsed && "opacity-0 h-0 py-0 overflow-hidden"
        )}>
          <Search className="h-4 w-4 text-sidebar-foreground/60 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full text-sidebar-foreground placeholder:text-sidebar-foreground/60"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4 scrollbar-none">
        <TooltipProvider delayDuration={0}>
          <nav className="grid gap-1 px-2">
            {mappedLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => navigate(link.href)}
                    className={cn(
                      "w-full flex items-center py-2 px-3 rounded-md transition-all duration-200 group relative",
                      isActive(link.href) 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      isCollapsed && "justify-center"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center">
                      <link.icon className="h-5 w-5" />
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left">{link.title}</span>
                        
                        {link.badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                            {link.badge}
                          </span>
                        )}
                      </>
                    )}
                    
                    {isCollapsed && link.badge && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                        {link.badge}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn("border shadow-md", !isCollapsed && "hidden")}>
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>

      <div className="mt-auto border-t border-sidebar-border p-4">
        <div 
          className={cn(
            "mb-4 flex items-center gap-3",
            isCollapsed && "flex-col gap-2"
          )}
        >
          <Avatar className="h-9 w-9 border border-sidebar-border shadow-sm bg-sidebar-accent">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className={cn("flex-1 transition-all duration-300", isCollapsed && "hidden")}>
            <p className="font-medium leading-none text-sidebar-foreground">{user?.name || "User"}</p>
            <p className="mt-1 text-xs text-sidebar-foreground/80 capitalize">{user?.role || "Guest"}</p>
          </div>
        </div>
        
        <div className="grid gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className={cn("transition-all duration-300", isCollapsed && "hidden")}>
              Log out
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSidebar}
            className="justify-center mt-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
