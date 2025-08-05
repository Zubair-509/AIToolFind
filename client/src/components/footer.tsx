import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Brain className="text-primary text-2xl mr-3" />
              <h3 className="text-xl font-bold">AI Tools Finder</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the perfect AI tools for your business with personalized 
              recommendations powered by advanced AI analysis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-features-footer">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-how-it-works-footer">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-about">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-privacy">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AI Tools Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
