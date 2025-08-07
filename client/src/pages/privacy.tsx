import { Shield, Eye, Lock, Database, Users, CheckCircle, AlertTriangle } from "lucide-react";

export default function Privacy() {
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
                Privacy Policy
              </h1>
            </div>
            
            <div className="fade-in stagger-2">
              <p className="text-large mb-8 max-w-3xl mx-auto">
                Your privacy is fundamental to our mission. Learn how we protect and 
                respect your data while providing exceptional AI tool recommendations.
              </p>
              <p className="mono text-sm text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <div className="fade-in">
              <h2 className="gradient-text mb-6">Our Privacy Principles</h2>
            </div>
            <div className="fade-in stagger-2">
              <p className="text-large max-w-2xl mx-auto">
                Simple, transparent, and user-first approach to data protection
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card scale-in stagger-1">
              <div className="icon-wrapper">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Data Minimization</h3>
              <p className="text-center text-muted-foreground">
                We only collect what's necessary to provide you with personalized AI tool recommendations
              </p>
            </div>
            
            <div className="card scale-in stagger-2">
              <div className="icon-wrapper">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Full Transparency</h3>
              <p className="text-center text-muted-foreground">
                Clear communication about what data we collect, why we collect it, and how we use it
              </p>
            </div>
            
            <div className="card scale-in stagger-3">
              <div className="icon-wrapper">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-center mb-4">Strong Security</h3>
              <p className="text-center text-muted-foreground">
                Industry-standard encryption and security measures to protect your information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Collect Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="fade-in">
                <h2 className="gradient-text mb-6">Information We Collect</h2>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-effect rounded-3xl p-8 slide-in-left">
                <div className="flex items-start gap-4">
                  <div className="icon-wrapper flex-shrink-0">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="gradient-text mb-4">Information You Provide</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        Business descriptions and requirements you submit for recommendations
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        Focus areas and preferences you select (optional)
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        Contact information if you reach out to us (name, email, message)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-3xl p-8 slide-in-right">
                <div className="flex items-start gap-4">
                  <div className="icon-wrapper flex-shrink-0">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="gradient-text mb-4">Automatically Collected Data</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        Basic usage analytics (pages visited, time spent, general location)
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        Technical information (browser type, device type, IP address)
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        Performance data to improve our service quality
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-3xl p-8 slide-in-left border border-orange-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-orange-400 mb-4">What We DON'T Collect</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>• Personal financial information or payment details</li>
                      <li>• Passwords or sensitive business data</li>
                      <li>• Personal conversations or private communications</li>
                      <li>• Information from third-party accounts without explicit permission</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Data Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="fade-in">
                <h2 className="gradient-text mb-6">How We Use Your Information</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Provide Recommendations",
                  description: "Analyze your business needs to generate personalized AI tool suggestions",
                  icon: <Users className="w-6 h-6 text-white" />
                },
                {
                  title: "Improve Our Service",
                  description: "Understand usage patterns to enhance our recommendation algorithms",
                  icon: <Database className="w-6 h-6 text-white" />
                },
                {
                  title: "Communicate With You",
                  description: "Respond to inquiries and provide customer support when needed",
                  icon: <Eye className="w-6 h-6 text-white" />
                },
                {
                  title: "Ensure Security",
                  description: "Protect against fraud, abuse, and security threats to our platform",
                  icon: <Shield className="w-6 h-6 text-white" />
                }
              ].map((item, index) => (
                <div key={index} className={`glass-effect rounded-2xl p-6 scale-in stagger-${index + 1}`}>
                  <div className="icon-wrapper mb-4">
                    {item.icon}
                  </div>
                  <h3 className="gradient-text mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="fade-in">
                <h2 className="gradient-text mb-6">Data Protection & Your Rights</h2>
              </div>
            </div>

            <div className="glass-effect rounded-3xl p-8 fade-in stagger-2">
              <div className="space-y-8">
                <div>
                  <h3 className="gradient-text mb-4">Your Privacy Rights</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "Access your personal data",
                      "Correct inaccurate information",
                      "Delete your data",
                      "Export your data",
                      "Restrict data processing",
                      "Withdraw consent anytime"
                    ].map((right, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        <span className="text-muted-foreground">{right}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="gradient-text mb-4">Security Measures</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-neon-purple flex-shrink-0" />
                      End-to-end encryption for all data transmission
                    </li>
                    <li className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-neon-purple flex-shrink-0" />
                      Regular security audits and penetration testing
                    </li>
                    <li className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-neon-purple flex-shrink-0" />
                      Strict access controls and employee data handling policies
                    </li>
                    <li className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-neon-purple flex-shrink-0" />
                      Compliance with GDPR, CCPA, and other privacy regulations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="glass-effect rounded-3xl p-8 text-center max-w-3xl mx-auto scale-in">
            <Shield className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="accent-gradient mb-4">Questions About Privacy?</h2>
            <p className="text-muted-foreground mb-6">
              We're committed to transparency. If you have any questions about our privacy 
              practices or want to exercise your rights, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@aitoolpilot.com" 
                className="text-neon-purple hover:text-neon-pink transition-colors font-light"
                data-testid="link-privacy-email"
              >
                privacy@aitoolpilot.com
              </a>
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <span className="text-muted-foreground">Response within 48 hours</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}