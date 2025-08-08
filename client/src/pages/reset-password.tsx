import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Check if we have a valid session from the reset link
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast({
          variant: "destructive",
          title: "Invalid reset link",
          description: "This password reset link is invalid or has expired.",
        });
        setLocation('/forgot-password');
      }
    });
  }, [setLocation, toast]);

  const onSubmit = async (data: ResetPasswordForm) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: error.message,
        });
      } else {
        setSuccess(true);
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
        });
        
        // Redirect to signin after a delay
        setTimeout(() => {
          setLocation('/signin');
        }, 3000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordValue = form.watch("password");

  const passwordCriteria = [
    { label: "At least 8 characters", met: passwordValue?.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(passwordValue || "") },
    { label: "One lowercase letter", met: /[a-z]/.test(passwordValue || "") },
    { label: "One number", met: /[0-9]/.test(passwordValue || "") },
  ];

  if (success) {
    return (
      <div className="min-h-screen">
        <section className="section-padding relative overflow-hidden">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="glass-effect rounded-3xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-6" />
                <h1 className="gradient-text mb-4">Password Updated</h1>
                <p className="text-muted-foreground mb-8">
                  Your password has been updated successfully. You will be redirected to the sign in page shortly.
                </p>
                <Button 
                  onClick={() => setLocation('/signin')}
                  className="btn-primary w-full"
                >
                  Go to Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="glass-effect rounded-3xl p-8">
              <div className="text-center mb-8">
                <Lock className="w-12 h-12 text-white mx-auto mb-4" />
                <h1 className="gradient-text mb-4">Set New Password</h1>
                <p className="text-muted-foreground">
                  Enter your new password below
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light gradient-text">New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="glass-effect border-border/30 focus:border-neon-purple/30 pr-10"
                              placeholder="Enter new password"
                              data-testid="input-password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        {passwordValue && (
                          <div className="mt-2 space-y-1">
                            {passwordCriteria.map((criterion, index) => (
                              <div
                                key={index}
                                className={`flex items-center gap-2 text-xs ${
                                  criterion.met ? "text-neon-green" : "text-muted-foreground"
                                }`}
                              >
                                <CheckCircle className={`w-3 h-3 ${criterion.met ? "text-neon-green" : "text-muted-foreground/30"}`} />
                                {criterion.label}
                              </div>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light gradient-text">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="glass-effect border-border/30 focus:border-neon-purple/30 pr-10"
                              placeholder="Confirm new password"
                              data-testid="input-confirm-password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                    data-testid="button-update-password"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        <span className="relative z-10">Updating...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Update Password</span>
                        <Lock className="ml-3 h-5 w-5 relative z-10" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}