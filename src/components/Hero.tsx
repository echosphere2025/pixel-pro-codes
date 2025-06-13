
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Sparkles, Shield, Download, Eye, KeyRound } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  onPreview: () => void;
  onVerifyCode: () => void;
}

const Hero = ({ onGetStarted, onPreview, onVerifyCode }: HeroProps) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <Sparkles className="w-3 h-3 mr-1" />
            20 QR Codes for Just $1
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Premium QR Code Generator
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get 20 high-quality QR codes for just $1. Download in multiple formats, 
            access anytime with your unique code. No subscriptions, pay once and own forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">20 QR Codes</h3>
              <p className="text-gray-600 text-sm">Generate up to 20 different QR codes with various content types</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Unique Access Code</h3>
              <p className="text-gray-600 text-sm">Get a personal code (e.g., JD1234) to access your QR codes anytime</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600 text-sm">Download as PNG, SVG, PDF, or EPS for any use case</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-lg px-8 py-6"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Get 20 QR Codes for $1
          </Button>
          
          <Button 
            onClick={onPreview}
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
          >
            <Eye className="w-5 h-5 mr-2" />
            Free Preview
          </Button>
          
          <Button 
            onClick={onVerifyCode}
            variant="ghost"
            size="lg"
            className="text-gray-600 hover:text-gray-800 text-lg px-8 py-6"
          >
            <KeyRound className="w-5 h-5 mr-2" />
            Enter Access Code
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>✅ No subscriptions • ✅ Lifetime access • ✅ Commercial use allowed</p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">$1</div>
            <div className="text-sm text-gray-600">One-time payment</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">20</div>
            <div className="text-sm text-gray-600">QR codes included</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">∞</div>
            <div className="text-sm text-gray-600">Lifetime access</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-sm text-gray-600">File formats</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
