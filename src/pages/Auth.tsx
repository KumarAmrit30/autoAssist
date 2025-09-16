import React from "react";
import { LoginCard, UserProfile } from "@/components/auth/AuthComponents";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedPage } from "@/components/ui/animated-page";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <AnimatedPage animation="automotive">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-slate-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage animation="automotive">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-md border border-slate-700/60 bg-slate-800/60 px-3 py-2 text-slate-100 shadow-sm transition hover:bg-slate-700/60 hover:border-slate-600/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M15.78 5.22a.75.75 0 0 1 0 1.06L10.06 12l5.72 5.72a.75.75 0 1 1-1.06 1.06l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <div className="flex items-center justify-center px-4 pb-12">
          {user ? <UserProfile /> : <LoginCard />}
        </div>
      </div>
    </AnimatedPage>
    
  );
}
