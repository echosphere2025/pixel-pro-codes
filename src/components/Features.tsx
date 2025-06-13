
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Shield, Zap, Globe, FileText, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Instant Upload",
      description: "Drag & drop or click to upload any file type. Lightning-fast processing."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your files are encrypted and stored securely. Privacy is our priority."
    },
    {
      icon: Zap,
      title: "No Limits",
      description: "Upload files of any size with no daily limits or restrictions."
    },
    {
      icon: Globe,
      title: "Share Anywhere",
      description: "Get shareable links that work anywhere, anytime. No account required."
    },
    {
      icon: FileText,
      title: "All File Types",
      description: "Support for documents, images, videos, archives, and more."
    },
    {
      icon: Users,
      title: "Team Friendly",
      description: "Perfect for personal use or sharing with teams and clients."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-violet-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Why Choose Our File Sharing Service?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and completely free file sharing for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
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
