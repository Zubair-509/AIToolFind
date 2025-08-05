import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, Sparkles, Star } from "lucide-react";
import type { AITool } from "@shared/schema";

interface ToolCardProps {
  tool: AITool;
  isPaid?: boolean;
}

export function ToolCard({ tool, isPaid = false }: ToolCardProps) {
  const pricingColor = isPaid 
    ? "bg-purple-100 text-purple-800 border-purple-200" 
    : tool.pricing === 'Free' 
    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
    : "bg-blue-100 text-blue-800 border-blue-200";

  return (
    <div className="glass-card ai-glow hover:transform hover:scale-105 transition-all duration-300 group relative overflow-hidden rounded-2xl p-8">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 gradient-bg"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors" data-testid={`text-tool-name-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
            {tool.tool_name}
          </h4>
        </div>
        <Badge className={`px-3 py-1 text-sm font-semibold ${pricingColor}`} data-testid={`text-pricing-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.pricing}
        </Badge>
      </div>
      
      <p className="text-foreground text-lg leading-relaxed mb-6" data-testid={`text-purpose-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
        {tool.purpose}
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <h5 className="font-bold text-emerald-800 text-lg">Pros</h5>
          </div>
          <ul className="space-y-2" data-testid={`list-pros-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
            {tool.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <h5 className="font-bold text-red-800 text-lg">Cons</h5>
          </div>
          <ul className="space-y-2" data-testid={`list-cons-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
            {tool.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-2 mb-3">
          <Star className="h-5 w-5 text-amber-500 mt-0.5" />
          <h5 className="font-bold text-foreground text-lg">Perfect For You:</h5>
        </div>
        <p className="text-muted-foreground leading-relaxed" data-testid={`text-why-fit-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.why_fit}
        </p>
      </div>
      
      <Button 
        className="w-full btn-primary py-4 text-lg font-semibold group-hover:shadow-2xl"
        data-testid={`button-visit-tool-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        Visit Tool <ExternalLink className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
