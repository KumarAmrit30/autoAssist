import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, User, Mail, Image } from "lucide-react";

export const LoginCard: React.FC = () => {
  const { login, isLoading } = useAuth();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-automotive-gradient bg-clip-text text-transparent">
          Welcome to AutoAssist
        </CardTitle>
        <CardDescription>
          Sign in to access personalized car recommendations and save your
          favorites
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={login}
          disabled={isLoading}
          className="w-full h-12 bg-automotive-gradient hover:shadow-glow text-white font-medium"
        >
          <LogIn className="w-5 h-5 mr-2" />
          {isLoading ? "Loading..." : "Continue with Google"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </CardContent>
    </Card>
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
  const { user, login, logout, isLoading } = useAuth();

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
      onClick={login}
      className="bg-automotive-gradient hover:shadow-glow"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
};
