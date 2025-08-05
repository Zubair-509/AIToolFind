import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Bot, ChartLine, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div>
      {/* Landing Section */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 via-neon-pink/5 to-neon-cyan/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15)_0%,transparent_50%)] 
                        [background-position:0%_0%] animate-[neon-shift_6s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.15)_0%,transparent_50%)] 
                        [background-position:100%_100%] animate-[neon-shift_8s_ease-in-out_infinite_alternate-reverse]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1)_0%,transparent_60%)] 
                        animate-[neon-rotate_10s_linear_infinite]"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-text mb-8">
            Find the Perfect AI Tools & Agents for Your Business
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Describe your business needs and get personalized AI tool and agent recommendations with 
            detailed comparisons, pricing, and implementation guides.
          </p>
          <Link href="/input">
            <Button 
              className="btn-primary text-lg shadow-2xl"
              data-testid="button-get-started"
            >
              Get Started - It's Free
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-6 font-medium">No signup required • Get instant recommendations</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose AI Tools & Agents Finder?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get curated, up-to-date recommendations tailored to your specific business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center ai-glow rounded-2xl group hover:transform hover:scale-105 transition-all duration-300">
              <div className="gradient-bg w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bot className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">AI-Powered Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced AI understands your business context and requirements to suggest the most relevant tools and agents
              </p>
            </div>
            <div className="glass-card p-8 text-center ai-glow rounded-2xl group hover:transform hover:scale-105 transition-all duration-300">
              <div className="gradient-bg w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChartLine className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Detailed Comparisons</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get comprehensive pros, cons, pricing, and fit analysis for each recommended tool and agent
              </p>
            </div>
            <div className="glass-card p-8 text-center ai-glow rounded-2xl group hover:transform hover:scale-105 transition-all duration-300">
              <div className="gradient-bg w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Save Time & Money</h3>
              <p className="text-muted-foreground leading-relaxed">
                Skip hours of research and avoid costly tool mistakes with expert recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get personalized AI tool recommendations in just 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Describe Your Needs</h3>
              <p className="text-gray-600">
                Tell us about your business, goals, or specific tasks you need help with
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your requirements and finds the best matching tools from our database
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive detailed tool comparisons with pros, cons, pricing, and implementation guidance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
