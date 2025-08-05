import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tool-card";
import { Download, Share, Plus, Gift, Crown, Sparkles } from "lucide-react";
import { Link } from "wouter";
import type { AITool } from "@shared/schema";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const handleExport = async () => {
    if (!results) return;
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;
      
      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI Tools & Agents Recommendations', margin, yPosition);
      yPosition += 15;
      
      // Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 15;
      
      // Free Tools Section
      if (freeTools.length > 0) {
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Free & Freemium Tools & Agents', margin, yPosition);
        yPosition += 10;
        
        freeTools.forEach((tool, index) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 60) {
            pdf.addPage();
            yPosition = margin;
          }
          
          // Tool name
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${tool.tool_name} (${tool.pricing})`, margin, yPosition);
          yPosition += 8;
          
          // Purpose
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          const purposeLines = pdf.splitTextToSize(tool.purpose, pageWidth - 2 * margin);
          pdf.text(purposeLines, margin, yPosition);
          yPosition += purposeLines.length * 5 + 3;
          
          // Pros
          pdf.setFont('helvetica', 'bold');
          pdf.text('Pros:', margin, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          tool.pros.forEach((pro) => {
            const proLines = pdf.splitTextToSize(`• ${pro}`, pageWidth - 2 * margin - 5);
            pdf.text(proLines, margin + 5, yPosition);
            yPosition += proLines.length * 4;
          });
          yPosition += 3;
          
          // Cons
          pdf.setFont('helvetica', 'bold');
          pdf.text('Cons:', margin, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          tool.cons.forEach((con) => {
            const conLines = pdf.splitTextToSize(`• ${con}`, pageWidth - 2 * margin - 5);
            pdf.text(conLines, margin + 5, yPosition);
            yPosition += conLines.length * 4;
          });
          yPosition += 3;
          
          // Why it fits
          pdf.setFont('helvetica', 'bold');
          pdf.text('Why it\'s perfect for you:', margin, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          const whyFitLines = pdf.splitTextToSize(tool.why_fit, pageWidth - 2 * margin);
          pdf.text(whyFitLines, margin, yPosition);
          yPosition += whyFitLines.length * 5 + 8;
        });
      }
      
      // Paid Tools Section
      if (paidTools.length > 0) {
        // Check if we need a new page for paid tools section
        if (yPosition > pageHeight - 100) {
          pdf.addPage();
          yPosition = margin;
        }
        
        yPosition += 10;
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Premium Tools & Agents', margin, yPosition);
        yPosition += 10;
        
        paidTools.forEach((tool, index) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 60) {
            pdf.addPage();
            yPosition = margin;
          }
          
          // Tool name
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${tool.tool_name} (${tool.pricing})`, margin, yPosition);
          yPosition += 8;
          
          // Purpose
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          const purposeLines = pdf.splitTextToSize(tool.purpose, pageWidth - 2 * margin);
          pdf.text(purposeLines, margin, yPosition);
          yPosition += purposeLines.length * 5 + 3;
          
          // Pros
          pdf.setFont('helvetica', 'bold');
          pdf.text('Pros:', margin, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          tool.pros.forEach((pro) => {
            const proLines = pdf.splitTextToSize(`• ${pro}`, pageWidth - 2 * margin - 5);
            pdf.text(proLines, margin + 5, yPosition);
            yPosition += proLines.length * 4;
          });
          yPosition += 3;
          
          // Cons
          pdf.setFont('helvetica', 'bold');
          pdf.text('Cons:', margin, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          tool.cons.forEach((con) => {
            const conLines = pdf.splitTextToSize(`• ${con}`, pageWidth - 2 * margin - 5);
            pdf.text(conLines, margin + 5, yPosition);
            yPosition += conLines.length * 4;
          });
          yPosition += 3;
          
          // Why it fits
          pdf.setFont('helvetica', 'bold');
          pdf.text('Why it\'s perfect for you:', margin, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          const whyFitLines = pdf.splitTextToSize(tool.why_fit, pageWidth - 2 * margin);
          pdf.text(whyFitLines, margin, yPosition);
          yPosition += whyFitLines.length * 5 + 8;
        });
      }
      
      // Save the PDF
      pdf.save('ai-tools-agents-recommendations.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to JSON export if PDF fails
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
    }
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
      <div className="py-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card ai-glow rounded-3xl p-16">
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-foreground mb-4">No recommendations found</h3>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Please go back and describe your business needs.</p>
            <Link href="/input">
              <Button className="btn-primary text-lg py-4 px-8" data-testid="button-go-back">
                Start Over
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
            <h2 className="hero-text text-5xl">AI Tools & Agents for You</h2>
          </div>
          <p className="text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
            Based on your business description, here are the best AI tools and agents perfectly matched to your needs
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Button 
              onClick={handleExport}
              className="btn-primary text-lg py-4 px-6"
              data-testid="button-export-results"
            >
              <Download className="mr-3 h-5 w-5" />
              Export as PDF
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="glass-card border-2 border-primary/20 text-primary px-6 py-4 text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              data-testid="button-share-results"
            >
              <Share className="mr-3 h-5 w-5" />
              Share
            </Button>
            <Link href="/input">
              <Button 
                variant="outline"
                className="glass-card border-2 border-accent/20 text-accent px-6 py-4 text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-200"
                data-testid="button-new-search"
              >
                <Plus className="mr-3 h-5 w-5" />
                New Search
              </Button>
            </Link>
          </div>
        </div>

        {/* Free Tools Section */}
        {freeTools.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gift className="h-8 w-8 text-emerald-600" />
                <h3 className="text-4xl font-bold text-foreground">Free & Freemium Tools & Agents</h3>
              </div>
              <p className="text-lg text-muted-foreground">Get started with these powerful free options</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {freeTools.map((tool, index) => (
                <ToolCard key={index} tool={tool} isPaid={false} />
              ))}
            </div>
          </div>
        )}

        {/* Paid Tools Section */}
        {paidTools.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="h-8 w-8 text-amber-500" />
                <h3 className="text-4xl font-bold text-foreground">Premium Tools & Agents</h3>
              </div>
              <p className="text-lg text-muted-foreground">Investment-grade solutions for scaling your business</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {paidTools.map((tool, index) => (
                <ToolCard key={index} tool={tool} isPaid={true} />
              ))}
            </div>
          </div>
        )}

        {/* Action Plan Section */}
        <div className="glass-card ai-glow rounded-3xl p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
            <h3 className="text-4xl font-bold text-foreground">Ready to Get Started?</h3>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a step-by-step implementation plan for using these AI tools to achieve your business goals.
          </p>
          <Button 
            className="btn-primary text-xl py-6 px-10"
            data-testid="button-generate-action-plan"
          >
            <Sparkles className="mr-3 h-6 w-6" />
            Generate Action Plan
          </Button>
        </div>
      </div>
    </section>
  );
}
