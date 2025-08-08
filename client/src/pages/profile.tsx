import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Save, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileForm = z.infer<typeof profileSchema>;

function ProfileContent() {
  const { user, updateProfile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      // Load user profile data
      const loadProfile = async () => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          form.reset({
            full_name: profile.full_name || "",
            email: profile.email || user.email || "",
          });
        } else {
          form.reset({
            full_name: user.user_metadata?.full_name || "",
            email: user.email || "",
          });
        }
      };

      loadProfile();
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileForm) => {
    setLoading(true);
    await updateProfile({ full_name: data.full_name });
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  return (
    <div className="min-h-screen">
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="glass-effect rounded-3xl p-8">
              <div className="text-center mb-8">
                <User className="w-12 h-12 text-white mx-auto mb-4" />
                <h1 className="gradient-text mb-4">Profile Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account information
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light gradient-text">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="glass-effect border-border/30 focus:border-neon-purple/30"
                            placeholder="Enter your full name"
                            data-testid="input-full-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light gradient-text">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled
                            className="glass-effect border-border/30 opacity-60"
                            placeholder="Enter your email"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed. Contact support if you need to update your email.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1"
                      data-testid="button-save-profile"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          <span className="relative z-10">Saving...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Save Changes</span>
                          <Save className="ml-3 h-5 w-5 relative z-10" />
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSignOut}
                      className="btn-secondary flex-1"
                      data-testid="button-sign-out"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}