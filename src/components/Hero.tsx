
import { Button } from "@/components/ui/button";
import { QrCode, Zap, Download, Shield } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
              <QrCode className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent leading-tight">
            Create & Download QR Codes Instantly
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Only $1 per download, or 10 for $5 – no ads, no sign-up required.
            Generate professional QR codes and barcodes in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onGetStarted}
            >
              <QrCode className="w-5 h-5 mr-2" />
              Generate QR Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2 hover:bg-secondary/10 transition-all duration-300"
            >
              View Examples
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-medium">Instant Generation</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border">
              <Download className="w-6 h-6 text-primary" />
              <span className="font-medium">High Resolution</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-medium">No Watermarks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
