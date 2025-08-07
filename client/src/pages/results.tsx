import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tool-card";
import { Download, Share, Plus, Gift, Crown, Sparkles, Search } from "lucide-react";
import { Link } from "wouter";
import type { AITool } from "@shared/schema";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

interface RecommendationResults {
  id: string;
  tools: AITool[];
  usedProvider?: string;
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
      const bottomMargin = 25; // Larger bottom margin to prevent cut-offs
      const usableHeight = pageHeight - margin - bottomMargin;
      let yPosition = margin;
      
      // Helper function to calculate content height for a tool
      const calculateToolHeight = (tool: any) => {
        let height = 0;
        
        // Tool name
        height += 10;
        
        // Purpose
        const purposeLines = pdf.splitTextToSize(tool.purpose, pageWidth - 2 * margin);
        height += purposeLines.length * 5 + 5;
        
        // Pros
        height += 8; // "Pros:" heading
        tool.pros.forEach((pro: string) => {
          const proLines = pdf.splitTextToSize(`• ${pro}`, pageWidth - 2 * margin - 5);
          height += proLines.length * 4 + 1;
        });
        height += 5;
        
        // Cons
        height += 8; // "Cons:" heading
        tool.cons.forEach((con: string) => {
          const conLines = pdf.splitTextToSize(`• ${con}`, pageWidth - 2 * margin - 5);
          height += conLines.length * 4 + 1;
        });
        height += 5;
        
        // Why it fits
        height += 8; // "Why it's perfect for you:" heading
        const whyFitLines = pdf.splitTextToSize(tool.why_fit, pageWidth - 2 * margin);
        height += whyFitLines.length * 5 + 10; // Extra spacing after tool
        
        return height;
      };
      
      // Helper function to add a tool to PDF
      const addToolToPdf = (tool: any, index: number) => {
        const requiredHeight = calculateToolHeight(tool);
        
        // Check if tool fits on current page
        if (yPosition + requiredHeight > usableHeight && yPosition > margin + 20) {
          pdf.addPage();
          yPosition = margin;
        }
        
        // Tool name
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${tool.tool_name} (${tool.pricing})`, margin, yPosition);
        yPosition += 10;
        
        // Purpose
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        const purposeLines = pdf.splitTextToSize(tool.purpose, pageWidth - 2 * margin);
        pdf.text(purposeLines, margin, yPosition);
        yPosition += purposeLines.length * 5 + 5;
        
        // Pros
        pdf.setFont('helvetica', 'bold');
        pdf.text('Pros:', margin, yPosition);
        yPosition += 6;
        pdf.setFont('helvetica', 'normal');
        tool.pros.forEach((pro: string) => {
          // Check if individual pro needs a new page
          const proLines = pdf.splitTextToSize(`• ${pro}`, pageWidth - 2 * margin - 5);
          if (yPosition + proLines.length * 4 > usableHeight) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(proLines, margin + 5, yPosition);
          yPosition += proLines.length * 4 + 1;
        });
        yPosition += 4;
        
        // Cons
        if (yPosition + 15 > usableHeight) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFont('helvetica', 'bold');
        pdf.text('Cons:', margin, yPosition);
        yPosition += 6;
        pdf.setFont('helvetica', 'normal');
        tool.cons.forEach((con: string) => {
          // Check if individual con needs a new page
          const conLines = pdf.splitTextToSize(`• ${con}`, pageWidth - 2 * margin - 5);
          if (yPosition + conLines.length * 4 > usableHeight) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(conLines, margin + 5, yPosition);
          yPosition += conLines.length * 4 + 1;
        });
        yPosition += 4;
        
        // Why it fits
        if (yPosition + 20 > usableHeight) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFont('helvetica', 'bold');
        pdf.text('Why it\'s perfect for you:', margin, yPosition);
        yPosition += 6;
        pdf.setFont('helvetica', 'normal');
        const whyFitLines = pdf.splitTextToSize(tool.why_fit, pageWidth - 2 * margin);
        // Check if "why fit" content needs a new page
        if (yPosition + whyFitLines.length * 5 > usableHeight) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(whyFitLines, margin, yPosition);
        yPosition += whyFitLines.length * 5 + 12;
      };
      
      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI Tools & Agents Recommendations', margin, yPosition);
      yPosition += 15;
      
      // Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 20;
      
      // Free Tools Section
      if (freeTools.length > 0) {
        // Check if section header fits
        if (yPosition + 15 > usableHeight) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Free & Freemium Tools & Agents', margin, yPosition);
        yPosition += 15;
        
        freeTools.forEach((tool, index) => {
          addToolToPdf(tool, index);
        });
      }
      
      // Paid Tools Section
      if (paidTools.length > 0) {
        // Check if we need a new page for paid tools section
        if (yPosition + 25 > usableHeight) {
          pdf.addPage();
          yPosition = margin;
        } else {
          yPosition += 5;
        }
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Premium Tools & Agents', margin, yPosition);
        yPosition += 15;
        
        paidTools.forEach((tool, index) => {
          addToolToPdf(tool, index);
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(240, 10%, 3.9%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-16">
            <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">No recommendations found</h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">Please go back and describe your business needs.</p>
            <Link href="/input">
              <Button className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white border-0 rounded-full px-8 py-4 text-lg font-medium" data-testid="button-go-back">
                Start Over
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'hsl(240, 10%, 3.9%)' }}>
      {/* Stellar particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated floating particles */}
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute top-[25%] left-[80%] w-0.5 h-0.5 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] left-[70%] w-0.5 h-0.5 bg-emerald-300/60 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[15%] left-[60%] w-0.5 h-0.5 bg-pink-300/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[35%] left-[85%] w-1 h-1 bg-cyan-300/50 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-[55%] left-[10%] w-0.5 h-0.5 bg-yellow-300/40 rounded-full animate-pulse" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute top-[75%] left-[90%] w-1.5 h-1.5 bg-indigo-400/50 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[5%] left-[45%] w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '4.5s' }}></div>
        
        {/* Larger glowing orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-12 pb-8 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">
                Based on your business description, here are the best AI tools and agents
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent font-normal">
                  perfectly matched to your needs
                </span>
              </h1>
              {results.usedProvider && (
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm text-gray-300">Powered by {results.usedProvider} AI</span>
                </div>
              )}
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center flex-wrap gap-4 mb-12"
            >
              <Button 
                onClick={handleExport}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
                data-testid="button-export-results"
              >
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
              <Button 
                onClick={handleShare}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
                data-testid="button-share-results"
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Link href="/input">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white border-0 rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
                  data-testid="button-new-search"
                >
                  <Search className="mr-2 h-4 w-4" />
                  New Search
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Free Tools Section */}
        {freeTools.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="px-4 sm:px-6 lg:px-8 mb-16"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-6">
                  <Gift className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Get started with these powerful free options</span>
                </div>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-6">
                {freeTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  >
                    <ToolCard tool={tool} isPaid={false} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Paid Tools Section */}
        {paidTools.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="px-4 sm:px-6 lg:px-8 mb-16"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-3 mb-6">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-400 font-medium">Investment-grade solutions for scaling your business</span>
                </div>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-6">
                {paidTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  >
                    <ToolCard tool={tool} isPaid={true} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

      </div>
    </div>
  );
}
