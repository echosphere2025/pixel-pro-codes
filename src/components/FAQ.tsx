
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "What is a QR code?",
      answer: "A QR (Quick Response) code is a two-dimensional barcode that can store various types of information like URLs, text, contact details, Wi-Fi credentials, and more. They can be scanned using smartphone cameras."
    },
    {
      question: "Is this QR code generator really free?",
      answer: "Yes! Our QR code generator is completely free with no hidden costs, registration requirements, or usage limits. Generate and download as many QR codes as you need."
    },
    {
      question: "What formats can I download my QR code in?",
      answer: "You can download your QR codes as high-quality PNG images, which work perfectly for both digital and print use."
    },
    {
      question: "How do I scan a QR code?",
      answer: "Most modern smartphones can scan QR codes using their built-in camera app. Simply open your camera, point it at the QR code, and tap the notification that appears."
    },
    {
      question: "Can I customize the appearance of my QR code?",
      answer: "Yes! You can customize the colors and size of your QR code to match your brand or design preferences."
    },
    {
      question: "Do QR codes expire?",
      answer: "QR codes themselves don't expire, but if they contain URLs pointing to websites or services that are discontinued, they may stop working."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about QR codes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
