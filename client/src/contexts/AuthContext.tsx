import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);
      
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const configError = {
          message: "Authentication is not configured. Please set up your Supabase environment variables."
        } as AuthError;
        
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Authentication service is not configured. Please contact support.",
        });
        
        return { error: configError };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: authError.message,
      });
      return { error: authError };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const configError = {
          message: "Authentication is not configured. Please set up your Supabase environment variables."
        } as AuthError;
        
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Authentication service is not configured. Please contact support.",
        });
        
        return { error: configError };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        });
      }

      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: authError.message,
      });
      return { error: authError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      return { error: authError };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a password reset link.",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: authError.message,
      });
      return { error: authError };
    }
  };

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Profile update failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }

      return { error };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}