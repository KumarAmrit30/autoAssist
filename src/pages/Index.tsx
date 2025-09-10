import { useState } from "react";
import { LoadingPage } from "@/components/ui/loading-page";
import Home from "./Home";

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <LoadingPage onGetStarted={() => setShowApp(true)} />;
  }

  return <Home />;
};

export default Index;
