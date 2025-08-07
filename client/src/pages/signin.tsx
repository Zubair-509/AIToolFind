
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement sign in logic
      console.log("Sign in data:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-3 h-3 gradient-bg rounded-full floating-element opacity-20"></div>
          <div className="absolute top-40 right-16 w-2 h-2 gradient-bg rounded-full floating-element opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-20 w-2.5 h-2.5 gradient-bg rounded-full floating-element opacity-25" style={{ animationDelay: '4s' }}></div>

          <div className="max-w-md mx-auto">
            {/* Back Link */}
            <div className="fade-in mb-8">
              <Link href="/">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="glass-effect rounded-3xl p-8 slide-in-up">
              <div className="text-center mb-8 fade-in">
                <LogIn className="w-12 h-12 text-white mx-auto mb-4" />
                <h1 className="gradient-text mb-4">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to your AI ToolPilot account
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="scale-in stagger-1">
                        <FormLabel className="font-light gradient-text">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="glass-effect border-border/30 focus:border-neon-purple/30"
                            placeholder="Enter your email"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="scale-in stagger-2">
                        <FormLabel className="font-light gradient-text">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="glass-effect border-border/30 focus:border-neon-purple/30 pr-10"
                              placeholder="Enter your password"
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between scale-in stagger-3">
                    <Link href="/forgot-password">
                      <Button variant="link" className="text-neon-purple hover:text-neon-purple/80 p-0">
                        Forgot password?
                      </Button>
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full scale-in stagger-4"
                    data-testid="button-sign-in"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        <span className="relative z-10">Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Sign In</span>
                        <LogIn className="ml-3 h-5 w-5 relative z-10" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center mt-8 scale-in stagger-5">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <Button variant="link" className="text-neon-purple hover:text-neon-purple/80 p-0">
                      Sign up
                    </Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
