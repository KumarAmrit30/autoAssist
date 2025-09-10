import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LoadingPageProps {
  onGetStarted: () => void;
}

export function LoadingPage({ onGetStarted }: LoadingPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowButtons(true), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* CarVault Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-2 bg-automotive-gradient bg-clip-text text-transparent">
            CarVault
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Your Premium Car Information Hub
          </p>
        </div>

        {/* Tire Loader */}
        {isLoading && (
          <div className="mb-12">
            <div 
              className={`w-24 h-24 mx-auto rounded-full border-8 border-border bg-tire-gradient relative ${
                isLoading ? 'tire-spin' : 'tire-roll'
              }`}
            >
              {/* Tire treads */}
              <div className="absolute inset-2 rounded-full border-4 border-muted-foreground/30" />
              <div className="absolute inset-4 rounded-full border-2 border-muted-foreground/20" />
              
              {/* Center hub */}
              <div className="absolute inset-6 rounded-full bg-chrome-gradient flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full glow-pulse" />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-muted-foreground font-medium">Loading your automotive experience...</div>
              <div className="mt-2 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Buttons */}
        {showButtons && (
          <div className="space-y-4 slide-up">
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                variant="default" 
                size="lg" 
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-automotive-gradient hover:shadow-glow transition-all duration-300 font-semibold text-lg px-8 py-3"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onGetStarted}
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold text-lg px-8 py-3"
              >
                Sign Up
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm mt-6">
              Join thousands of car enthusiasts discovering their perfect ride
            </p>
          </div>
        )}
      </div>
    </div>
  );
}