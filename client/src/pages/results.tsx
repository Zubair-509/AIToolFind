import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Results() {
  const [, setLocation] = useLocation();

  return (
    <section className="section-padding min-h-screen">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4"
            data-testid="button-back-to-input"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Input
          </Button>
          
          <h1 className="text-3xl font-bold mb-4">AI Tool Recommendations</h1>
          <p className="text-lg text-muted-foreground">
            Results will be displayed here once API is implemented
          </p>
        </div>
      </div>
    </section>
  );
}