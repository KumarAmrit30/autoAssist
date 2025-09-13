import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AuthButton } from "@/components/auth/AuthComponents";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import {
  Search,
  User,
  Menu,
  X,
  GitCompare,
  MessageCircle,
  Home,
  Info,
  Phone,
} from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { fadeNavigate } = useAnimatedNavigation();

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "About Us", icon: Info, href: "/about" },
    { name: "Contact", icon: Phone, href: "/contact" },
    { name: "Compare Cars", icon: GitCompare, href: "/compare" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fadeNavigate("/", 300)}
                className="text-2xl font-bold bg-automotive-gradient bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                AutoAssist
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => fadeNavigate(item.href, 300)}
                  className="flex items-center space-x-2 hover:text-primary transition-all duration-200 hover:scale-105"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Authentication Button */}
            <div className="flex items-center space-x-4">
              <AuthButton />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    onClick={() => fadeNavigate(item.href, 300)}
                    className="w-full justify-start space-x-2 transition-all duration-200 hover:scale-105"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                ))}
              </div>

              {/* Mobile Search */}
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Chatbot Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-automotive-gradient hover:shadow-glow transition-all duration-300 glow-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </>
  );
}
