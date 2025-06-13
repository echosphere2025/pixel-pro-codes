
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "What is a QR code?",
      answer: "A QR (Quick Response) code is a two-dimensional barcode that can store various types of information like URLs, text, contact details, Wi-Fi credentials, and more. They can be scanned using smartphone cameras for instant access to the encoded information."
    },
    {
      question: "Where can I use QR codes?",
      answer: "QR codes are versatile and can be used for restaurant menus, business cards, Wi-Fi sharing, event tickets, product information, social media profiles, email contacts, website links, and much more. They're perfect for bridging physical and digital experiences."
    },
    {
      question: "Is this QR code generator really free?",
      answer: "Yes! Our QR code generator is completely free with no hidden costs, registration requirements, subscription fees, or usage limits. Generate and download as many QR codes as you need, forever."
    },
    {
      question: "What file formats can I download my QR code in?",
      answer: "You can download your QR codes in multiple high-quality formats: PNG (recommended for web), JPEG (for mobile sharing), SVG (vector format for print), PDF (for documents), and EPS (for professional design work)."
    },
    {
      question: "How do I scan a QR code?",
      answer: "Most modern smartphones can scan QR codes using their built-in camera app. Simply open your camera, point it at the QR code, and tap the notification that appears. You can also use dedicated QR code scanner apps."
    },
    {
      question: "Can I customize the appearance of my QR code?",
      answer: "Yes! You can customize the colors, size, and error correction level of your QR code to match your brand or design preferences. Our generator provides options to create QR codes that fit your specific needs."
    },
    {
      question: "Do QR codes expire?",
      answer: "QR codes themselves don't expire, but if they contain URLs pointing to websites or services that are discontinued, they may stop working. Static information like text, contact details, or Wi-Fi credentials will always work."
    },
    {
      question: "Are there any limits on QR code generation?",
      answer: "No! There are no limits on the number of QR codes you can create or download. Our service is completely free and unlimited, allowing you to generate as many QR codes as needed for your personal or business use."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about QR codes and our free generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="h-full shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
