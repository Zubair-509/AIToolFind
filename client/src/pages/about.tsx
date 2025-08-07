import { Brain, Target, Users, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-3 h-3 gradient-bg rounded-full floating-element opacity-20"></div>
          <div className="absolute top-40 right-16 w-2 h-2 gradient-bg rounded-full floating-element opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-20 w-2.5 h-2.5 gradient-bg rounded-full floating-element opacity-25" style={{ animationDelay: '4s' }}></div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in">
              <h1 className="gradient-text mb-8 leading-tight">
                About AI ToolPilot
              </h1>
            </div>
            
            <div className="fade-in stagger-2">
              <p className="text-large mb-12 max-w-3xl mx-auto">
                Empowering businesses to discover and implement the perfect AI solutions 
                for their unique challenges and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="slide-in-left">
              <div className="icon-wrapper mb-8">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="gradient-text mb-6">Our Mission</h2>
              <p className="text-large mb-6">
                We believe every business deserves access to the transformative power of AI, 
                regardless of technical expertise or budget constraints.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform democratizes AI discovery by providing personalized, expert-level 
                recommendations that help businesses find the exact tools they need to thrive 
                in the digital age.
              </p>
            </div>
            
            <div className="slide-in-right">
              <div className="glass-effect rounded-3xl p-8 neon-glow">
                <div className="space-y-6">
                  {[
                    "Simplify AI tool discovery",
                    "Provide expert-level insights",
                    "Support informed decision-making",
                    "Accelerate business transformation"
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center gap-4 scale-in stagger-${index + 1}`}>
                      <CheckCircle className="w-6 h-6 text-neon-green flex-shrink-0" />
                      <span className="text-lg font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-muted/20">
        <div className="container">
          <div className="text-center mb-20">
            <div className="fade-in">
              <h2 className="gradient-text mb-6">Our Values</h2>
            </div>
            <div className="fade-in stagger-2">
              <p className="text-large max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </div>
          
          <div className="grid-3">
            <div className="card scale-in stagger-1">
              <div className="icon-wrapper">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Intelligence</h3>
              <p className="text-center text-muted-foreground">
                Leveraging cutting-edge AI to provide the most accurate and relevant recommendations
              </p>
            </div>
            
            <div className="card scale-in stagger-2">
              <div className="icon-wrapper">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Accessibility</h3>
              <p className="text-center text-muted-foreground">
                Making advanced AI insights available to businesses of all sizes and technical backgrounds
              </p>
            </div>
            
            <div className="card scale-in stagger-3">
              <div className="icon-wrapper">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Innovation</h3>
              <p className="text-center text-muted-foreground">
                Continuously evolving our platform to stay ahead of the rapidly changing AI landscape
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="fade-in">
                <h2 className="gradient-text mb-6">Our Story</h2>
              </div>
            </div>
            
            <div className="glass-effect rounded-3xl p-12 fade-in stagger-2">
              <div className="space-y-6 text-large leading-relaxed">
                <p>
                  AI ToolPilot was born from a simple observation: while AI tools were revolutionizing 
                  industries, businesses were struggling to navigate the overwhelming landscape of 
                  available solutions.
                </p>
                <p>
                  We saw talented entrepreneurs and established companies alike spending countless 
                  hours researching tools, only to make suboptimal choices or miss game-changing 
                  opportunities entirely.
                </p>
                <p>
                  Today, our AI-powered recommendation engine analyzes thousands of tools across 
                  every category, providing personalized insights that would take human experts 
                  weeks to compile.
                </p>
              </div>
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-large mb-8 max-w-2xl mx-auto">
                Join thousands of businesses who've discovered their perfect AI solutions
              </p>
              <Link href="/input">
                <Button className="btn-primary text-lg">
                  Start Your Discovery
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}