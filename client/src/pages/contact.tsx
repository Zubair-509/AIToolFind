import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, MapPin, Send, Clock, Sparkles } from "lucide-react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
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
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in">
              <h1 className="gradient-text mb-8 leading-tight">
                Get in Touch
              </h1>
            </div>
            
            <div className="fade-in stagger-2">
              <p className="text-large mb-12 max-w-3xl mx-auto">
                Have questions about AI tools? Need personalized recommendations? 
                We're here to help you find the perfect solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-effect rounded-3xl p-8 neon-glow fade-in">
                <div className="mb-8">
                  <h2 className="gradient-text mb-4">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll respond within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="scale-in stagger-1">
                            <FormLabel className="font-light gradient-text">Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="glass-effect border-border/30 focus:border-neon-purple/30"
                                placeholder="Your full name"
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
                                placeholder="your.email@example.com"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="scale-in stagger-3">
                          <FormLabel className="font-light gradient-text">Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="glass-effect border-border/30 focus:border-neon-purple/30"
                              placeholder="What can we help you with?"
                              data-testid="input-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="scale-in stagger-4">
                          <FormLabel className="font-light gradient-text">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              className="glass-effect border-border/30 focus:border-neon-purple/30 resize-none"
                              placeholder="Tell us more about your needs or questions..."
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto scale-in stagger-5"
                      data-testid="button-send-message"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          <span className="relative z-10">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Send Message</span>
                          <Send className="ml-3 h-5 w-5 relative z-10" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="glass-effect rounded-3xl p-6 slide-in-right">
                <div className="icon-wrapper mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 gradient-text">Email Us</h3>
                <p className="text-muted-foreground mb-2">Get a response within 24 hours</p>
                <a 
                  href="mailto:hello@aitoolpilot.com" 
                  className="text-foreground hover:text-neon-purple transition-colors"
                  data-testid="link-email"
                >
                  hello@aitoolpilot.com
                </a>
              </div>

              <div className="glass-effect rounded-3xl p-6 slide-in-right stagger-2">
                <div className="icon-wrapper mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 gradient-text">Live Chat</h3>
                <p className="text-muted-foreground mb-2">Available Monday - Friday</p>
                <p className="text-foreground">9:00 AM - 6:00 PM EST</p>
              </div>

              <div className="glass-effect rounded-3xl p-6 slide-in-right stagger-3">
                <div className="icon-wrapper mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 gradient-text">Response Time</h3>
                <p className="text-muted-foreground mb-2">We typically respond within</p>
                <p className="text-foreground">2-4 hours during business hours</p>
              </div>

              <div className="glass-effect rounded-3xl p-6 slide-in-right stagger-4">
                <div className="icon-wrapper mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 gradient-text">Priority Support</h3>
                <p className="text-muted-foreground">
                  Need urgent assistance? Mention "Priority" in your subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="fade-in">
              <h2 className="gradient-text mb-6">Quick Answers</h2>
            </div>
            <div className="fade-in stagger-2">
              <p className="text-large max-w-2xl mx-auto">
                Common questions we receive about AI ToolPilot
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How accurate are your AI tool recommendations?",
                answer: "Our AI analyzes over 1000+ tools and provides 95%+ accuracy based on user feedback and success metrics."
              },
              {
                question: "Is the service really free?",
                answer: "Yes! Our core recommendation service is completely free. No hidden fees or signup required."
              },
              {
                question: "How current is your tool database?",
                answer: "We update our database weekly with new tools and monthly with pricing/feature changes."
              },
              {
                question: "Can you help with implementation?",
                answer: "We provide detailed implementation guides and can connect you with certified partners for hands-on support."
              }
            ].map((faq, index) => (
              <div key={index} className={`glass-effect rounded-2xl p-6 scale-in stagger-${index + 1}`}>
                <h4 className="font-light mb-3 gradient-text">{faq.question}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}