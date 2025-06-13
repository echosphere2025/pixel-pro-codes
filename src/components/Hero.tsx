
import { Button } from "@/components/ui/button";
import { QrCode, Smartphone, Download, Zap } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <QrCode className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Generate Your QR Code Instantly — <span className="text-yellow-300">100% Free</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Create custom QR codes for websites, Wi-Fi, contact info, or text in seconds — no login needed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-purple-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={onGetStarted}
            >
              <QrCode className="w-5 h-5 mr-2" />
              Generate QR Code Now
            </Button>
          </div>

          <div className="text-center mb-12">
            <p className="text-2xl font-semibold text-yellow-300 mb-2">
              No Sign-up. No Cost. Just Create & Download.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-lg font-semibold text-white mb-2">Instant Generation</div>
              <div className="text-white/80 text-sm">Create QR codes in seconds</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Smartphone className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-lg font-semibold text-white mb-2">Mobile Friendly</div>
              <div className="text-white/80 text-sm">Works perfectly on all devices</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Download className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-lg font-semibold text-white mb-2">Free Download</div>
              <div className="text-white/80 text-sm">Download as PNG instantly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
