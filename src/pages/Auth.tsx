import React from "react";
import { LoginCard, UserProfile } from "@/components/auth/AuthComponents";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedPage } from "@/components/ui/animated-page";

export default function Auth() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AnimatedPage animation="automotive">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage animation="automotive">
      {user ? <UserProfile /> : <LoginCard />}
    </AnimatedPage>
  );
}
