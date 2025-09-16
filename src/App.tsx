import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CarDetails from "./pages/CarDetails";
import Compare from "./pages/Compare";
import { CompareProvider } from "@/contexts/CompareContext";
import { Chatbot } from "@/components/ui/chatbot";

const queryClient = new QueryClient();

// Dynamic basename for development vs production
const basename = import.meta.env.DEV ? "/" : "/autoAssist";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CompareProvider>
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/compare" element={<Compare />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CompareProvider>
      </AuthProvider>
    </TooltipProvider>
    <Chatbot />
  </QueryClientProvider>
);

export default App;
