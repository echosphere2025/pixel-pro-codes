
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Palette, Download, Shield, Zap, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: QrCode,
      title: "Multiple Formats",
      description: "Generate QR codes for text, URLs, emails, phone numbers, WiFi, and vCards"
    },
    {
      icon: Palette,
      title: "Custom Styling",
      description: "Choose colors, sizes, and add your logo to create branded QR codes"
    },
    {
      icon: Download,
      title: "High Quality Downloads",
      description: "Download in PNG, SVG, or PDF formats in high resolution"
    },
    {
      icon: Shield,
      title: "No Watermarks",
      description: "Clean, professional QR codes without any watermarks or branding"
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Create and preview your QR codes in real-time as you type"
    },
    {
      icon: Globe,
      title: "No Sign-up Required",
      description: "Start generating QR codes immediately without creating an account"
    }
  ];

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Professional QR Codes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning, customizable QR codes with our advanced generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
