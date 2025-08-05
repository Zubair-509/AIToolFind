import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tool-card";
import { Download, Share, Plus, Gift, Crown, Sparkles } from "lucide-react";
import { Link } from "wouter";
import type { AITool } from "@shared/schema";

interface RecommendationResults {
  id: string;
  tools: AITool[];
}

export default function Results() {
  const [results, setResults] = useState<RecommendationResults | null>(null);
  const [freeTools, setFreeTools] = useState<AITool[]>([]);
  const [paidTools, setPaidTools] = useState<AITool[]>([]);

  useEffect(() => {
    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem("recommendationResults");
    if (storedResults) {
      const parsedResults: RecommendationResults = JSON.parse(storedResults);
      setResults(parsedResults);
      
      // Separate free/freemium and paid tools
      const free = parsedResults.tools.filter(tool => 
        tool.pricing === "Free" || tool.pricing === "Freemium"
      );
      const paid = parsedResults.tools.filter(tool => 
        tool.pricing === "Paid"
      );
      
      setFreeTools(free);
      setPaidTools(paid);
    }
  }, []);

  const handleExport = () => {
    if (!results) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      recommendations: results.tools,
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: "application/json" 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-tools-recommendations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share && results) {
      try {
        await navigator.share({
          title: "AI Tools Recommendations",
          text: `Check out these AI tool recommendations: ${results.tools.map(t => t.tool_name).join(", ")}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  if (!results) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No recommendations found</h3>
            <p className="text-gray-600 mb-6">Please go back and describe your business needs.</p>
            <Link href="/input">
              <Button className="bg-primary text-white px-6 py-3 rounded-lg" data-testid="button-go-back">
                Start Over
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended AI Tools & Agents</h2>
          <p className="text-gray-600 mb-6">
            Based on your business description, here are the best AI tools and agents for you
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-2">
            <Button 
              onClick={handleExport}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-export-results"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              data-testid="button-share-results"
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Link href="/input">
              <Button 
                variant="outline"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                data-testid="button-new-search"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Search
              </Button>
            </Link>
          </div>
        </div>

        {/* Free Tools Section */}
        {freeTools.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Gift className="text-green-500 mr-3" />
              Free & Freemium Tools & Agents
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {freeTools.map((tool, index) => (
                <ToolCard key={index} tool={tool} isPaid={false} />
              ))}
            </div>
          </div>
        )}

        {/* Paid Tools Section */}
        {paidTools.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Crown className="text-yellow-500 mr-3" />
              Premium Tools & Agents
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidTools.map((tool, index) => (
                <ToolCard key={index} tool={tool} isPaid={true} />
              ))}
            </div>
          </div>
        )}

        {/* Action Plan Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="text-primary mr-3" />
            Generate Your Action Plan
          </h3>
          <p className="text-gray-600 mb-6">
            Get a step-by-step implementation plan for using these AI tools to achieve your business goals.
          </p>
          <Button 
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-generate-action-plan"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Action Plan
          </Button>
        </div>
      </div>
    </section>
  );
}
