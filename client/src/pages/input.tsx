import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { z } from "zod";

const formSchema = z.object({
  userInput: z.string().min(1, "Business description is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Input() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      // API call will be implemented here
      throw new Error("API not yet implemented");
    },
    onSuccess: (data) => {
      setLocation("/results");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
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
    submitMutation.mutate(data);
  };

  return (
    <section className="section-padding min-h-screen">
      <div className="container max-w-4xl">
        <div className="rounded-3xl p-12 border">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Describe Your Business Needs</h2>
            <p className="text-lg">
              Tell us about your business, goals, or the specific tasks you need help with
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Business Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={8}
                        className="w-full px-6 py-4 border rounded-2xl text-lg resize-none"
                        placeholder="Describe your business or what you're trying to do... 

For example: I'm starting a clothing brand and need help with social media marketing, creating Instagram reels, and designing a logo..."
                        data-testid="textarea-business-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full py-6 text-xl"
                data-testid="button-find-tools"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Find AI Tools & Agents</span>
                    <Search className="ml-3 h-6 w-6" />
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