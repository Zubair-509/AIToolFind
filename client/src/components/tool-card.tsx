import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";
import type { AITool } from "@shared/schema";

interface ToolCardProps {
  tool: AITool;
  isPaid?: boolean;
}

export function ToolCard({ tool, isPaid = false }: ToolCardProps) {
  const borderColor = isPaid ? "border-yellow-500" : "border-green-500";
  const badgeColor = isPaid ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800";

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${borderColor}`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-semibold text-gray-900" data-testid={`text-tool-name-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.tool_name}
        </h4>
        <Badge className={badgeColor} data-testid={`text-pricing-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.pricing}
        </Badge>
      </div>
      
      <p className="text-gray-600 mb-4" data-testid={`text-purpose-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
        {tool.purpose}
      </p>
      
      <div className="mb-4">
        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
          <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
          Pros
        </h5>
        <ul className="text-sm text-gray-600 space-y-1" data-testid={`list-pros-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.pros.map((pro, index) => (
            <li key={index}>• {pro}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
          <AlertTriangle className="text-amber-500 mr-2 h-4 w-4" />
          Cons
        </h5>
        <ul className="text-sm text-gray-600 space-y-1" data-testid={`list-cons-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.cons.map((con, index) => (
            <li key={index}>• {con}</li>
          ))}
        </ul>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h5 className="font-medium text-blue-900 mb-2">Why it's perfect for you:</h5>
        <p className="text-sm text-blue-800" data-testid={`text-why-fit-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.why_fit}
        </p>
      </div>
      
      <Button 
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
        data-testid={`button-visit-tool-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        Visit Tool <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
