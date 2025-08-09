import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, Sparkles, Star } from "lucide-react";
import type { AITool } from "@shared/schema";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { AnimatedButton } from "@/components/animations/AnimatedButton";

interface ToolCardProps {
  tool: AITool;
  isPaid?: boolean;
}

export function ToolCard({ tool, isPaid = false }: ToolCardProps) {
  const pricingColor = isPaid 
    ? "bg-amber-500/20 text-amber-300 border-amber-500/30" 
    : tool.pricing === 'Free' 
    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    : "bg-blue-500/20 text-blue-300 border-blue-500/30";

  const cardGradient = isPaid 
    ? "from-amber-500/5 to-purple-500/5"
    : "from-emerald-500/5 to-blue-500/5";

  return (
    <AnimatedCard className={`bg-gradient-to-br ${cardGradient} bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden h-full flex flex-col`}>
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/20 via-emerald-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-full w-full rounded-2xl bg-slate-900"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <h4 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors" data-testid={`text-tool-name-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
              {tool.tool_name}
            </h4>
          </div>
          <Badge className={`px-3 py-1 text-xs font-medium rounded-full border ${pricingColor}`} data-testid={`text-pricing-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
            {tool.pricing}
          </Badge>
        </div>
        
        <p className="text-gray-300 text-base leading-relaxed mb-6" data-testid={`text-purpose-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tool.purpose}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <h5 className="font-semibold text-emerald-300 text-sm uppercase tracking-wide">Pros</h5>
            </div>
            <ul className="space-y-2" data-testid={`list-pros-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
              {tool.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              <h5 className="font-semibold text-red-300 text-sm uppercase tracking-wide">Cons</h5>
            </div>
            <ul className="space-y-2" data-testid={`list-cons-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
              {tool.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex-grow">
          <div className="flex items-start gap-2 mb-3">
            <Star className="h-4 w-4 text-amber-400 mt-0.5" />
            <h5 className="font-semibold text-amber-300 text-sm uppercase tracking-wide">Perfect For You</h5>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm" data-testid={`text-why-fit-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}>
            {tool.why_fit}
          </p>
        </div>
        
        <AnimatedButton 
          className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white border-0 rounded-lg py-3 font-medium transition-all duration-300 group-hover:scale-105 mt-auto"
          data-testid={`button-visit-tool-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
          onClick={() => {
            if (tool.link) {
              window.open(tool.link, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          Visit Tool <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </AnimatedButton>
      </div>
    </AnimatedCard>
  );
}
