import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Zap, Target, Clock, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { TypewriterText } from "@/components/animations/TypewriterText";
import { StaggeredCards } from "@/components/animations/StaggeredCards";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-3 h-3 gradient-bg rounded-full floating-element opacity-20"></div>
          <div className="absolute top-40 right-16 w-2 h-2 gradient-bg rounded-full floating-element opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-20 w-2.5 h-2.5 gradient-bg rounded-full floating-element opacity-25" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-32 right-32 w-1.5 h-1.5 gradient-bg rounded-full floating-element opacity-35" style={{ animationDelay: '6s' }}></div>
          
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedSection delay={0.2}>
              <h1 className="gradient-text mb-8 leading-tight">
                <TypewriterText 
                  text="Find Perfect AI Tools"
                  delay={500}
                  speed={80}
                />
                <br />
                <span className="accent-gradient">Built for Your Business</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <p className="text-large mb-12 max-w-3xl mx-auto">
                Get personalized AI tool recommendations with detailed analysis, 
                pricing comparisons, and implementation guides. No signup required.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.6}>
              <Link href="/input">
                <AnimatedButton className="btn-primary text-lg group relative overflow-hidden">
                  <span className="relative z-10">Start Discovery</span>
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 relative z-10" />
                </AnimatedButton>
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.8}>
              <p className="mono text-sm text-muted-foreground mt-8 font-light">
                // Instant • Free • No Registration
              </p>
            </AnimatedSection>
          </div>
          
          {/* Scroll Indicator */}
          <AnimatedSection delay={1.0} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <FloatingElement duration={2} amplitude={5}>
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </FloatingElement>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container">
          <div className="text-center mb-20">
            <AnimatedSection direction="left" delay={0.2}>
              <h2 className="gradient-text mb-6">
                Why Choose Our Platform
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.4}>
              <p className="text-large max-w-2xl mx-auto">
                Advanced AI analysis meets intuitive design for the perfect tool discovery experience
              </p>
            </AnimatedSection>
          </div>
          
          <StaggeredCards className="grid-3" staggerDelay={0.15}>
            <AnimatedCard className="card" index={0}>
              <FloatingElement duration={4} amplitude={3}>
                <div className="icon-wrapper">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </FloatingElement>
              <h3 className="text-center mb-4">Smart Analysis</h3>
              <p className="text-center text-muted-foreground">
                Advanced AI understands your business context and requirements to deliver precise recommendations
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="card" index={1}>
              <FloatingElement duration={3.5} amplitude={4}>
                <div className="icon-wrapper">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </FloatingElement>
              <h3 className="text-center mb-4">Detailed Insights</h3>
              <p className="text-center text-muted-foreground">
                Comprehensive analysis including pros, cons, pricing, and implementation strategies
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="card" index={2}>
              <FloatingElement duration={4.5} amplitude={2}>
                <div className="icon-wrapper">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </FloatingElement>
              <h3 className="text-center mb-4">Lightning Fast</h3>
              <p className="text-center text-muted-foreground">
                Get instant recommendations and skip hours of manual research and comparison
              </p>
            </AnimatedCard>
          </StaggeredCards>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="section-padding bg-gradient-to-b from-transparent to-muted/20">
        <div className="container">
          <div className="text-center mb-20">
            <AnimatedSection delay={0.2}>
              <h2 className="gradient-text mb-6">
                Simple Process
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-large max-w-2xl mx-auto">
                Three steps to find your perfect AI tools
              </p>
            </AnimatedSection>
          </div>
          
          <StaggeredCards className="grid-3" staggerDelay={0.2}>
            <AnimatedSection direction="left" className="text-center" delay={0.1}>
              <div className="w-16 h-16 bg-gradient-flow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white mono">01</span>
              </div>
              <h3 className="mb-4">Describe Your Needs</h3>
              <p className="text-muted-foreground">
                Tell us about your business goals, challenges, and specific requirements
              </p>
            </AnimatedSection>
            
            <AnimatedSection direction="left" className="text-center" delay={0.3}>
              <div className="w-16 h-16 bg-gradient-flow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white mono">02</span>
              </div>
              <h3 className="mb-4">AI Analysis</h3>
              <p className="text-center text-muted-foreground">
                Our advanced AI processes your requirements and searches our comprehensive database
              </p>
            </AnimatedSection>
            
            <AnimatedSection direction="left" className="text-center" delay={0.5}>
              <div className="w-16 h-16 bg-gradient-flow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white mono">03</span>
              </div>
              <h3 className="mb-4">Get Results</h3>
              <p className="text-center text-muted-foreground">
                Receive curated recommendations with detailed comparisons and implementation guides
              </p>
            </AnimatedSection>
          </StaggeredCards>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <AnimatedCard className="glass-effect rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <FloatingElement duration={3} amplitude={5}>
              <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            </FloatingElement>
            <AnimatedSection delay={0.2}>
              <h2 className="accent-gradient mb-6">
                Ready to Discover Your Perfect AI Tools?
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-large mb-8 max-w-2xl mx-auto">
                Join thousands of businesses who've found their ideal AI solutions through our platform
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/input">
                  <AnimatedButton className="btn-primary text-lg">
                    Start Free Discovery
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </AnimatedButton>
                </Link>
                <AnimatedButton className="btn-secondary text-lg">
                  Learn More
                </AnimatedButton>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.8}>
              <p className="mono text-sm text-muted-foreground mt-6">
                // No credit card required
              </p>
            </AnimatedSection>
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
}