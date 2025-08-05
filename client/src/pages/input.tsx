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
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Describe Your Business Needs</h2>
            <p className="text-gray-600">
              Tell us about your business, goals, or the specific tasks you need help with
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Business Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="Example: I'm starting a clothing brand and need help with social media marketing, creating Instagram reels, and designing a logo..."
                        data-testid="textarea-business-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-3">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Primary Focus Areas (Optional)
                </FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {focusOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={focusAreas.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleFocusAreaChange(option.id, checked as boolean)
                        }
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        data-testid={`checkbox-${option.id}`}
                      />
                      <label 
                        htmlFor={option.id} 
                        className="text-sm text-gray-700 cursor-pointer"
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
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-find-tools"
              >
                {getRecommendationsMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Your Needs...
                  </>
                ) : (
                  <>
                    Find AI Tools
                    <Search className="ml-2 h-4 w-4" />
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
