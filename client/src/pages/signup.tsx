
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, UserPlus, ArrowLeft, CheckCircle } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const { signup } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsSubmitting(true);
    setError("");
    try {
      await signup(data.name, data.email, data.password);
      setLocation("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordValue = form.watch("password");

  const passwordCriteria = [
    { label: "At least 8 characters", met: passwordValue?.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(passwordValue || "") },
    { label: "One lowercase letter", met: /[a-z]/.test(passwordValue || "") },
    { label: "One number", met: /[0-9]/.test(passwordValue || "") },
  ];

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
                <UserPlus className="w-12 h-12 text-white mx-auto mb-4" />
                <h1 className="gradient-text mb-4">
                  Join AI ToolPilot
                </h1>
                <p className="text-muted-foreground">
                  Create your account to discover perfect AI tools
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="scale-in stagger-1">
                        <FormLabel className="font-light gradient-text">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="glass-effect border-border/30 focus:border-neon-purple/30"
                            placeholder="Enter your full name"
                            data-testid="input-name"
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
                      <FormItem className="scale-in stagger-2">
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
                      <FormItem className="scale-in stagger-3">
                        <FormLabel className="font-light gradient-text">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="glass-effect border-border/30 focus:border-neon-purple/30 pr-10"
                              placeholder="Create a password"
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
                      <FormItem className="scale-in stagger-4">
                        <FormLabel className="font-light gradient-text">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="glass-effect border-border/30 focus:border-neon-purple/30 pr-10"
                              placeholder="Confirm your password"
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

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="scale-in stagger-5">
                        <div className="flex items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-light cursor-pointer">
                              I agree to the{" "}
                              <Link href="/privacy">
                                <Button variant="link" className="text-neon-purple hover:text-neon-purple/80 p-0 h-auto">
                                  Terms of Service
                                </Button>
                              </Link>
                              {" "}and{" "}
                              <Link href="/privacy">
                                <Button variant="link" className="text-neon-purple hover:text-neon-purple/80 p-0 h-auto">
                                  Privacy Policy
                                </Button>
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full scale-in stagger-6"
                    data-testid="button-sign-up"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        <span className="relative z-10">Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Create Account</span>
                        <UserPlus className="ml-3 h-5 w-5 relative z-10" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center mt-8 scale-in stagger-7">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/signin">
                    <Button variant="link" className="text-neon-purple hover:text-neon-purple/80 p-0">
                      Sign in
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
