import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertRecommendationSchema } from "@shared/schema";
import { Search, Loader2, Cpu, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { z } from "zod";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { FullScreenLoader } from "@/components/animations/LoadingSpinner";
import { AnimatePresence } from "framer-motion";

const formSchema = insertRecommendationSchema.extend({
  focusAreas: z.array(z.string()).optional(),
  preferredProvider: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AIProvider {
  name: string;
  available: boolean;
}

const focusOptions = [
  { id: "marketing", label: "Marketing & Advertising" },
  { id: "design", label: "Graphic Design & UI/UX" },
  { id: "content", label: "Content Creation & Writing" },
  { id: "video", label: "Video & Animation" },
  { id: "analytics", label: "Data Analytics & Insights" },
  { id: "automation", label: "Workflow Automation" },
  { id: "customer-service", label: "Customer Service & Support" },
  { id: "social-media", label: "Social Media Management" },
  { id: "coding", label: "Coding & Development" },
  { id: "productivity", label: "Productivity & Organization" },
  { id: "finance", label: "Finance & Accounting" },
  { id: "hr", label: "HR & Recruitment" },
  { id: "sales", label: "Sales & CRM" },
  { id: "education", label: "Education & Training" },
  { id: "translation", label: "Translation & Localization" },
  { id: "research", label: "Research & Analysis" },
  { id: "ecommerce", label: "E-commerce & Retail" },
  { id: "healthcare", label: "Healthcare & Medical" },
];

export default function Input() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("auto");

  // AI providers data - will be populated when new API setup is complete
  const [providersData, setProvidersData] = useState<{ providers: AIProvider[], count: number }>({
    providers: [
      { name: "Ready for New Setup", available: false }
    ],
    count: 0
  });
  const [providersLoading, setProvidersLoading] = useState(false);

  // Function to update providers when new APIs are configured
  const updateProviders = (newProviders: AIProvider[]) => {
    setProvidersData({
      providers: newProviders,
      count: newProviders.filter(p => p.available).length
    });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
      focusAreas: [],
      preferredProvider: "auto",
    },
  });

  const getRecommendationsMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/recommendations", {
        userInput: data.userInput,
        preferredProvider: selectedProvider,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Store results in sessionStorage to pass to results page
      sessionStorage.setItem("recommendationResults", JSON.stringify(data));
      setLocation("/results");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get recommendations. Please try again.",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.userInput.trim()) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please describe your business needs",
      });
      return;
    }
    getRecommendationsMutation.mutate(data);
  };

  const handleFocusAreaChange = (areaId: string, checked: boolean) => {
    if (checked) {
      setFocusAreas(prev => [...prev, areaId]);
    } else {
      setFocusAreas(prev => prev.filter(id => id !== areaId));
    }
  };

  return (
    <section className="section-padding min-h-screen">
      <div className="container max-w-4xl">
        <AnimatedCard className="glass-effect rounded-3xl p-12 neon-glow">
          <AnimatedSection className="text-center mb-12">
            <h2 className="gradient-text mb-6">Describe Your Business Needs</h2>
            <p className="text-large">
              Tell us about your business, goals, or the specific tasks you need help with
            </p>
          </AnimatedSection>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <AnimatedSection delay={0.2}>
                    <FormItem>
                    <FormLabel className="text-lg font-light text-foreground mb-4 block gradient-text">
                      Business Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={8}
                        className="w-full px-6 py-4 border border-border/30 rounded-2xl focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/30 transition-all duration-500 text-lg resize-none glass-effect backdrop-blur-sm font-light"
                        placeholder="Describe your business or what you're trying to do... 

For example: I'm starting a clothing brand and need help with social media marketing, creating Instagram reels, and designing a logo..."
                        data-testid="textarea-business-description"
                      />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  </AnimatedSection>
                )}
              />
              
              {/* AI Model Selection - Recreated with same design */}
              <AnimatedSection delay={0.4} className="space-y-4">
                <FormLabel className="text-lg font-light text-foreground mb-4 block gradient-text flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  AI Model Selection
                </FormLabel>
                <Select 
                  value={selectedProvider} 
                  onValueChange={setSelectedProvider}
                  disabled={providersLoading}
                >
                  <SelectTrigger className="w-full px-6 py-4 border border-border/30 rounded-2xl focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/30 transition-all duration-500 text-lg glass-effect backdrop-blur-sm font-light">
                    <SelectValue placeholder={
                      providersLoading 
                        ? "Loading AI models..." 
                        : "Select AI Model (Auto-select if none chosen)"
                    } />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-sm border border-border/30">
                    <SelectItem value="auto" className="text-lg font-light">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-emerald-400" />
                        Auto-select Best Available
                      </div>
                    </SelectItem>
                    {providersData.providers.map((provider) => (
                      <SelectItem 
                        key={provider.name} 
                        value={provider.name.toLowerCase().replace(/\s+/g, '-')}
                        className="text-lg font-light"
                        disabled={!provider.available}
                      >
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            provider.available ? 'bg-emerald-400' : 'bg-gray-400'
                          }`}></div>
                          {provider.name}
                          {!provider.available && (
                            <span className="ml-2 text-xs text-gray-500">(API key needed)</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground font-light">
                  Choose your preferred AI model. Different models may provide varying perspectives and recommendations.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.6} className="space-y-6">
                <FormLabel className="text-xl font-light gradient-text">
                  Primary Focus Areas (Optional)
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {focusOptions.map((option, index) => (
                    <AnimatedSection 
                      key={option.id} 
                      delay={0.8 + (index * 0.05)}
                      className="flex items-center space-x-3 p-3 rounded-xl border border-border/30 glass-effect hover:border-border/50 transition-all duration-500"
                    >
                      <Checkbox
                        id={option.id}
                        checked={focusAreas.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleFocusAreaChange(option.id, checked as boolean)
                        }
                        className="rounded border border-border data-[state=checked]:border-neon-purple data-[state=checked]:bg-neon-purple/20 h-4 w-4"
                        data-testid={`checkbox-${option.id}`}
                      />
                      <label 
                        htmlFor={option.id} 
                        className="text-sm text-foreground cursor-pointer font-light flex-1"
                      >
                        {option.label}
                      </label>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={1.2}>
                <AnimatedButton
                type="submit"
                disabled={getRecommendationsMutation.isPending}
                className="w-full btn-primary py-6 text-xl font-light disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-find-tools"
                >
                {getRecommendationsMutation.isPending ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    <span className="relative z-10">Analyzing Your Needs...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Find AI Tools & Agents</span>
                    <Search className="ml-3 h-6 w-6 relative z-10" />
                  </>
                )}
                </AnimatedButton>
              </AnimatedSection>
            </form>
          </Form>
        </AnimatedCard>
      </div>
      
      <AnimatePresence>
        {getRecommendationsMutation.isPending && <FullScreenLoader />}
      </AnimatePresence>
    </section>
  );
}
