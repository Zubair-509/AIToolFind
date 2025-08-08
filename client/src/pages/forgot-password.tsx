import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword, loading } = useAuth();

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    const { error } = await resetPassword(data.email);
    
    if (!error) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen">
        <section className="section-padding relative overflow-hidden">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="glass-effect rounded-3xl p-8 text-center">
                <Mail className="w-16 h-16 text-neon-green mx-auto mb-6" />
                <h1 className="gradient-text mb-4">Check Your Email</h1>
                <p className="text-muted-foreground mb-8">
                  We've sent a password reset link to your email address. 
                  Click the link in the email to reset your password.
                </p>
                <Link href="/signin">
                  <Button className="btn-primary w-full">
                    Back to Sign In
                  </Button>
                </Link>
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
            <div className="fade-in mb-8">
              <Link href="/signin">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </div>

            <div className="glass-effect rounded-3xl p-8">
              <div className="text-center mb-8">
                <Mail className="w-12 h-12 text-white mx-auto mb-4" />
                <h1 className="gradient-text mb-4">Reset Password</h1>
                <p className="text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            className="glass-effect border-border/30 focus:border-neon-purple/30"
                            placeholder="Enter your email"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                    data-testid="button-reset-password"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Send Reset Link</span>
                        <Mail className="ml-3 h-5 w-5 relative z-10" />
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