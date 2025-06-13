
import { Button } from "@/components/ui/button";
import { QrCode, Smartphone, Download, Zap, Wifi, CreditCard, Menu } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-purple-100/20 to-indigo-100/30" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <QrCode className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Instant QR Code Generator — <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">100% Free</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Generate QR codes for links, text, Wi-Fi, and more. No login. No cost.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={onGetStarted}
              >
                <QrCode className="w-5 h-5 mr-2" />
                Generate QR Code Now
              </Button>
            </div>

            <div className="text-center lg:text-left mb-8">
              <p className="text-lg font-semibold text-green-600 mb-2">
                ✅ No Sign-up Required • No Hidden Costs • Instant Download
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center lg:text-left p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <Zap className="w-6 h-6 text-blue-600 mx-auto lg:mx-0 mb-2" />
                <div className="text-sm font-semibold text-gray-900">Instant Generation</div>
                <div className="text-gray-600 text-xs">Create in seconds</div>
              </div>
              <div className="text-center lg:text-left p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-200/50 shadow-sm">
                <Download className="w-6 h-6 text-purple-600 mx-auto lg:mx-0 mb-2" />
                <div className="text-sm font-semibold text-gray-900">Multiple Formats</div>
                <div className="text-gray-600 text-xs">PNG, SVG, PDF & more</div>
              </div>
              <div className="text-center lg:text-left p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-indigo-200/50 shadow-sm">
                <Smartphone className="w-6 h-6 text-indigo-600 mx-auto lg:mx-0 mb-2" />
                <div className="text-sm font-semibold text-gray-900">Mobile Ready</div>
                <div className="text-gray-600 text-xs">Works everywhere</div>
              </div>
            </div>
          </div>

          {/* Visual Illustrations */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Phone scanning QR illustration */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-2">Mobile Scanning</h3>
                <p className="text-sm text-gray-600 text-center">Instant access with any smartphone camera</p>
              </div>

              {/* WiFi QR illustration */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Wifi className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-2">Wi-Fi Sharing</h3>
                <p className="text-sm text-gray-600 text-center">Share network credentials instantly</p>
              </div>

              {/* Business Card illustration */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-2">Business Cards</h3>
                <p className="text-sm text-gray-600 text-center">Digital contact information</p>
              </div>

              {/* Menu illustration */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Menu className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-2">Restaurant Menus</h3>
                <p className="text-sm text-gray-600 text-center">Contactless menu access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
