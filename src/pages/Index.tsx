import { useState } from "react";
import { LoadingPage } from "@/components/ui/loading-page";
import Home from "./Home";

const Index = () => {
  const [showApp, setShowApp] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(false);

  const handleGetStarted = () => {
    setShowApp(true);
    // Trigger fade-in animation for Home component
    setTimeout(() => {
      setIsHomeVisible(true);
    }, 50); // Small delay to ensure smooth transition
  };

  if (!showApp) {
    return <LoadingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div
      className={`transition-opacity duration-500 ${
        isHomeVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Home />
    </div>
  );
};

export default Index;
