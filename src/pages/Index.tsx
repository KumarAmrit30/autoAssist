import React from "react";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "@/components/ui/loading-page";
import { AnimatedPage } from "@/components/ui/animated-page";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Loading completed, navigating to /home");
    // Navigate to home page after loading
    navigate("/home", { replace: true });
  };

  // Always show loading screen on the root route
  return (
    <AnimatedPage animation="automotive">
      <LoadingPage onGetStarted={handleGetStarted} />
    </AnimatedPage>
  );
};

export default Index;
