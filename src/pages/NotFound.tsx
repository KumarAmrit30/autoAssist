import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedPage } from "@/components/ui/animated-page";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { fadeNavigate } = useAnimatedNavigation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AnimatedPage animation="automotive">
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-8xl font-bold bg-automotive-gradient bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Oops! Page not found
            </h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => fadeNavigate("/", 300)}
              className="w-full bg-automotive-gradient hover:shadow-glow transition-all duration-200 hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;
