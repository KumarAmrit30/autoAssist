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
import { LogIn, User, Mail, Lock, Eye, EyeOff, Check, ArrowRight } from "lucide-react";

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
      const hasDigit = /[0-9]/.test(value);
      const hasSymbol = /[^A-Za-z0-9]/.test(value);
      setPasswordChecks({
        length: value.length >= 8,
        number: hasDigit || hasSymbol,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 relative transition-all duration-300 ease-out hover:shadow-2xl">
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
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
              className="w-full h-10 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg lg:rounded-xl flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.01]"
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
            </div>

            {/* Bottom toggle */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isSignUp ? "Already member? " : "Don't have an account? "}
                <span className="font-medium">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </button>
            </div>
          </form>
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
      onClick={() => slideNavigate("/auth", "left", 400)}
      className="bg-automotive-gradient hover:shadow-glow transition-all duration-200 hover:scale-105"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
};