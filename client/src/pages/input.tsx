import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertRecommendationSchema } from "@shared/schema";
import { Search, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { z } from "zod";

const formSchema = insertRecommendationSchema.extend({
  focusAreas: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const focusOptions = [
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Design" },
  { id: "content", label: "Content" },
  { id: "analytics", label: "Analytics" },
  { id: "automation", label: "Automation" },
  { id: "video", label: "Video" },
];

export default function Input() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [focusAreas, setFocusAreas] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
      focusAreas: [],
    },
  });

  const getRecommendationsMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/recommendations", {
        userInput: data.userInput,
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
        <div className="glass-effect rounded-3xl p-12 neon-glow">
          <div className="text-center mb-12 fade-in">
            <h2 className="gradient-text mb-6">Describe Your Business Needs</h2>
            <p className="text-large">
              Tell us about your business, goals, or the specific tasks you need help with
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 fade-in stagger-2">
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
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
                )}
              />
              
              <div className="space-y-6">
                <FormLabel className="text-xl font-light gradient-text">
                  Primary Focus Areas (Optional)
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {focusOptions.map((option, index) => (
                    <div key={option.id} className={`flex items-center space-x-4 p-4 rounded-xl border border-border/30 glass-effect hover:border-border/50 transition-all duration-500 scale-in stagger-${index + 1}`}>
                      <Checkbox
                        id={option.id}
                        checked={focusAreas.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleFocusAreaChange(option.id, checked as boolean)
                        }
                        className="rounded border border-border data-[state=checked]:border-neon-purple data-[state=checked]:bg-neon-purple/20 h-5 w-5"
                        data-testid={`checkbox-${option.id}`}
                      />
                      <label 
                        htmlFor={option.id} 
                        className="text-lg text-foreground cursor-pointer font-light flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={getRecommendationsMutation.isPending}
                className="w-full btn-primary py-6 text-xl font-light disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none scale-in stagger-6"
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
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
