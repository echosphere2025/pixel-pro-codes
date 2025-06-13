
import { Button } from "@/components/ui/button";
import { Upload, Users, FileText, Download } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-indigo-400/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-[size:30px_30px]" />
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Upload className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Free, Fast & Clean File Sharing
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Upload and share files instantly — no ads, no limits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-white text-violet-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={onGetStarted}
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Sharing Now
            </Button>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Users className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">50,000+</div>
              <div className="text-white/80 text-sm">Active Users</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <FileText className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">2M+</div>
              <div className="text-white/80 text-sm">Files Uploaded</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Download className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">10M+</div>
              <div className="text-white/80 text-sm">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
