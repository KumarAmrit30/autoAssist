import React from 'react';
import { LoginCard, UserProfile } from '@/components/auth/AuthComponents';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/ui/navigation';

export default function Auth() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          {user ? <UserProfile /> : <LoginCard />}
        </div>
      </main>
    </div>
  );
}
