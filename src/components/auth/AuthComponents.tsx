import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogIn,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Globe,
  ArrowRight,
  Instagram,
  Play,
  Key,
  Menu,
} from "lucide-react";

export const LoginCard: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    case: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "password") {
      setPasswordChecks({
        length: value.length >= 8,
        number: /[0-9!@#$%^&*(),.?":{}|<>]/.test(value),
        case: /[a-z]/.test(value) && /[A-Z]/.test(value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign up submission here
      console.log("Sign up submitted:", formData);
    } else {
      // Handle sign in submission here
      console.log("Sign in submitted:", {
        email: formData.email,
        password: formData.password,
      });
      // For now, use the existing Google login
      login();
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form when switching modes
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordChecks({
      length: false,
      number: false,
      case: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col lg:flex-row">
      {/* Left Panel - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 relative">
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                {isSignUp ? "Sign Up" : "Sign In"}
              </h1>
              <p className="text-gray-500 text-sm">
                {isSignUp
                  ? "Secure Your Communications with AutoAssist"
                  : "Welcome back to AutoAssist"}
              </p>
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                <button
                  onClick={toggleMode}
                  className="text-xs lg:text-sm text-blue-600 hover:text-blue-800"
                >
                  {isSignUp ? "Already Member? " : "Don't have an account? "}
                  <span className="font-medium">
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {/* Name Field - Only for Sign Up */}
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Daniel Ahmadi"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-12 pr-12 h-10 lg:h-12 rounded-lg lg:rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.name && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                  )}
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="TDanielehmadi@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-12 pr-12 h-10 lg:h-12 rounded-lg lg:rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {formData.email && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-12 pr-12 h-10 lg:h-12 rounded-lg lg:rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements - Only for Sign Up */}
              {isSignUp && formData.password && (
                <div className="space-y-2 text-sm">
                  <div
                    className={`flex items-center ${
                      passwordChecks.length ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mr-2 ${
                        passwordChecks.length
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                    />
                    At least 8 characters
                  </div>
                  <div
                    className={`flex items-center ${
                      passwordChecks.number ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mr-2 ${
                        passwordChecks.number
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                    />
                    At least one number (0-9) or a symbol
                  </div>
                  <div
                    className={`flex items-center ${
                      passwordChecks.case ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mr-2 ${
                        passwordChecks.case ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    Lowercase (a-z) and uppercase (A-Z)
                  </div>
                </div>
              )}

              {/* Confirm Password Field - Only for Sign Up */}
              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-Type Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="pl-12 pr-12 h-10 lg:h-12 rounded-lg lg:rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg lg:rounded-xl flex items-center justify-center gap-2"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
                <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5" />
              </Button>

              {/* Forgot Password Link - Only for Sign In */}
              {!isSignUp && (
                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Social Login */}
              <div className="flex justify-center gap-3 lg:gap-4 mt-4 lg:mt-6">
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition-shadow">
                  <svg className="w-5 lg:w-6 h-5 lg:h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition-shadow">
                  <svg
                    className="w-5 lg:w-6 h-5 lg:h-6"
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition-shadow">
                  <svg
                    className="w-5 lg:w-6 h-5 lg:h-6"
                    viewBox="0 0 24 24"
                    fill="#000000"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </button>
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-start mt-6 lg:mt-8">
                <Globe className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">ENG</span>
                <svg
                  className="w-4 h-4 text-gray-400 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="flex-1 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 relative overflow-hidden hidden lg:flex">
        {/* Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-300/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-300/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/5 rounded-full blur-xl"></div>
        </div>

        {/* Cards */}
        <div className="relative z-10 p-8 flex flex-col justify-between h-full">
          {/* Top Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 w-64 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-orange-500 text-sm font-medium">Price</span>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-4">176,18</div>
            <div className="h-12 bg-gradient-to-r from-orange-400 to-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-full h-8 bg-white/20 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 justify-end">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 w-64 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Menu className="w-5 h-5 text-gray-600" />
              <Key className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Your data, your rules
            </h3>
            <p className="text-sm text-gray-600">
              Your data belongs to you, and our encryption ensures that
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Decorative Panel */}
      <div className="lg:hidden bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 relative overflow-hidden py-8">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-8 w-24 h-24 bg-blue-300/15 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 px-4 flex flex-col items-center space-y-6">
          {/* Mobile Cards */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 w-48 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-orange-500 text-sm font-medium">Price</span>
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 text-white ml-0.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-3">176,18</div>
            <div className="h-8 bg-gradient-to-r from-orange-400 to-blue-500 rounded flex items-center justify-center">
              <div className="w-full h-4 bg-white/20 rounded flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 w-48 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Menu className="w-4 h-4 text-gray-600" />
              <Key className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-2">
              Your data, your rules
            </h3>
            <p className="text-xs text-gray-600">
              Your data belongs to you, and our encryption ensures that
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          {user.email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Welcome back! You're now signed in to AutoAssist.
        </div>

        <Button onClick={logout} variant="outline" className="w-full">
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

export const AuthButton: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { slideNavigate } = useAnimatedNavigation();

  if (isLoading) {
    return (
      <Button disabled className="bg-automotive-gradient">
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-primary"
          />
        )}
        <span className="hidden sm:inline text-sm font-medium">
          {user.name}
        </span>
        <Button onClick={logout} variant="outline" size="sm">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => slideNavigate("/auth", "right", 400)}
      className="bg-automotive-gradient hover:shadow-glow transition-all duration-200 hover:scale-105"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
};
