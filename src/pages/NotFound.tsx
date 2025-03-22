
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-white relative">
      <div className="relative z-10 text-center bg-white shadow-md p-10 rounded-xl max-w-md mx-auto animate-fade-in">
        <h1 className="text-8xl font-bold mb-4 text-gradient-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Oops! The page you're looking for doesn't exist</p>
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
