
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Wifi, Mail, Phone, User } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: QrCode,
      title: "Website URLs",
      description: "Create QR codes for any website or web page. Perfect for marketing materials and business cards."
    },
    {
      icon: Wifi,
      title: "Wi-Fi Networks",
      description: "Generate QR codes for Wi-Fi networks. Guests can connect instantly by scanning the code."
    },
    {
      icon: Mail,
      title: "Email Addresses",
      description: "Create QR codes that open email apps with pre-filled recipient, subject, and message."
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      description: "Generate QR codes for phone numbers. Scanning opens the dialer with the number ready to call."
    },
    {
      icon: User,
      title: "Contact Info",
      description: "Create vCard QR codes with complete contact information that can be saved to address books."
    },
    {
      icon: Smartphone,
      title: "Plain Text",
      description: "Generate QR codes for any text content. Perfect for sharing information quickly and easily."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Can You Create?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate QR codes for all types of content — completely free, no limits!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
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
