
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Index page loaded", { isAuthenticated, isLoading, user });
    
    // Only handle redirection if authentication check is complete
    if (!isLoading) {
      setRedirecting(true);
      
      // Delay the navigation slightly to ensure auth context is fully loaded
      const timer = setTimeout(() => {
        try {
          if (isAuthenticated && user) {
            console.log("Redirecting authenticated user to dashboard", user.role);
            // Redirect to appropriate dashboard based on user role
            if (user.role === 'admin') {
              navigate('/dashboard/admin');
            } else if (user.role === 'support') {
              navigate('/dashboard/support');
            } else {
              navigate('/dashboard/client');
            }
          } else {
            console.log("User not authenticated, redirecting to login");
            // If not authenticated, redirect to login
            navigate('/login');
          }
        } catch (e) {
          console.error("Navigation error:", e);
          setError("Error during navigation. Please try again.");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-8">
          <img
            src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
            alt="Symetrix Logo"
            className="h-16 w-16 mx-auto"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white mb-2">
            symetrix360 Portal
          </h1>
          <p className="text-lg text-blue-300">
            {error ? error : redirecting ? "Redirecting to your dashboard..." : "Loading..."}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
        
        {/* Show the demo mode message */}
        <div className="mt-8 text-sm text-blue-400 max-w-md mx-auto">
          <p>Running in demo mode - no backend connection required</p>
        </div>
        
        {/* Debug info for development */}
        {import.meta.env.DEV && (
          <div className="mt-4 text-xs text-gray-400 max-w-md mx-auto text-left">
            <p>isLoading: {isLoading ? "true" : "false"}</p>
            <p>isAuthenticated: {isAuthenticated ? "true" : "false"}</p>
            <p>redirecting: {redirecting ? "true" : "false"}</p>
            <p>User: {user ? JSON.stringify(user.role) : "null"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
