import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Bot, ChartLine, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div>
      {/* Landing Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the Perfect <span className="text-primary">AI Tools & Agents</span> for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Describe your business needs and get personalized AI tool and agent recommendations with 
            detailed comparisons, pricing, and implementation guides.
          </p>
          <Link href="/input">
            <Button 
              className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
              data-testid="button-get-started"
            >
              Get Started - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">No signup required • Get instant recommendations</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AI Tools Finder?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get curated, up-to-date recommendations tailored to your specific business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Advanced AI understands your business context and requirements to suggest the most relevant tools
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartLine className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Comparisons</h3>
              <p className="text-gray-600">
                Get comprehensive pros, cons, pricing, and fit analysis for each recommended tool
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time & Money</h3>
              <p className="text-gray-600">
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
