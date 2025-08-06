
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Zap, Target, Clock, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full floating-element"></div>
          <div className="absolute top-40 right-16 w-1 h-1 bg-white/30 rounded-full floating-element" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-white/25 rounded-full floating-element" style={{ animationDelay: '4s' }}></div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in">
              <h1 className="gradient-text mb-8">
                Find Perfect AI Tools<br />
                <span className="accent-gradient">Built for Your Business</span>
              </h1>
            </div>
            
            <div className="fade-in stagger-2">
              <p className="text-large mb-12 max-w-2xl mx-auto">
                Get personalized AI tool recommendations with detailed analysis, 
                pricing comparisons, and implementation guides. No signup required.
              </p>
            </div>
            
            <div className="fade-in stagger-3">
              <Link href="/input">
                <Button className="btn-primary text-lg group">
                  Start Discovery
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="fade-in stagger-4">
              <p className="mono text-sm text-muted-foreground mt-8">
                // Instant • Free • No Registration
              </p>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in stagger-5">
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-20">
            <div className="slide-in-left">
              <h2 className="gradient-text mb-6">
                Why Choose Our Platform
              </h2>
            </div>
            <div className="slide-in-right stagger-2">
              <p className="text-large max-w-2xl mx-auto">
                Advanced AI analysis meets intuitive design for the perfect tool discovery experience
              </p>
            </div>
          </div>
          
          <div className="grid-3">
            <div className="card scale-in stagger-1">
              <div className="icon-wrapper">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Smart Analysis</h3>
              <p className="text-center text-muted-foreground">
                Advanced AI understands your business context and requirements to deliver precise recommendations
              </p>
            </div>
            
            <div className="card scale-in stagger-2">
              <div className="icon-wrapper">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Detailed Insights</h3>
              <p className="text-center text-muted-foreground">
                Comprehensive analysis including pros, cons, pricing, and implementation strategies
              </p>
            </div>
            
            <div className="card scale-in stagger-3">
              <div className="icon-wrapper">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Lightning Fast</h3>
              <p className="text-center text-muted-foreground">
                Get instant recommendations and skip hours of manual research and comparison
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-muted/20">
        <div className="container">
          <div className="text-center mb-20">
            <div className="fade-in">
              <h2 className="gradient-text mb-6">
                Simple Process
              </h2>
            </div>
            <div className="fade-in stagger-2">
              <p className="text-large max-w-2xl mx-auto">
                Three steps to find your perfect AI tools
              </p>
            </div>
          </div>
          
          <div className="grid-3">
            <div className="text-center slide-in-left stagger-1">
              <div className="w-16 h-16 bg-gradient-flow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white mono">01</span>
              </div>
              <h3 className="mb-4">Describe Your Needs</h3>
              <p className="text-muted-foreground">
                Tell us about your business goals, challenges, and specific requirements
              </p>
            </div>
            
            <div className="text-center slide-in-left stagger-2">
              <div className="w-16 h-16 bg-gradient-flow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white mono">02</span>
              </div>
              <h3 className="mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI processes your requirements and searches our comprehensive database
              </p>
            </div>
            
            <div className="text-center slide-in-left stagger-3">
              <div className="w-16 h-16 bg-gradient-flow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white mono">03</span>
              </div>
              <h3 className="mb-4">Get Results</h3>
              <p className="text-muted-foreground">
                Receive curated recommendations with detailed comparisons and implementation guides
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="glass-effect rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <div className="scale-in">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
              <h2 className="accent-gradient mb-6">
                Ready to Discover Your Perfect AI Tools?
              </h2>
              <p className="text-large mb-8 max-w-2xl mx-auto">
                Join thousands of businesses who've found their ideal AI solutions through our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/input">
                  <Button className="btn-primary text-lg">
                    Start Free Discovery
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                <Button className="btn-secondary text-lg">
                  Learn More
                </Button>
              </div>
              <p className="mono text-sm text-muted-foreground mt-6">
                // No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
