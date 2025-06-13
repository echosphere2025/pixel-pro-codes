import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, QrCode } from "lucide-react";
import QRInputForm from "./QRInputForm";
import QRPreview from "./QRPreview";
import { useToast } from "@/hooks/use-toast";

interface QRGeneratorProps {
  onBack: () => void;
}

export interface QRData {
  type: 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard';
  content: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  logo?: string;
}

const QRGenerator = ({ onBack }: QRGeneratorProps) => {
  const { toast } = useToast();
  const [qrData, setQrData] = useState<QRData>({
    type: 'text',
    content: 'Hello World!',
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrection: 'M'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!qrData.content.trim()) {
      toast({
        title: "Please enter content",
        description: "Enter text, URL, or other content to generate your QR code.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "QR Code Generated!",
        description: "Your QR code is ready. Click download to save as PNG.",
      });
    }, 1000);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Your QR code has been saved as qr-code.png",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-secondary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Free QR Code Generator</h1>
            <p className="text-muted-foreground text-lg">Create and download your QR code instantly — completely free!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>QR Code Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QRInputForm qrData={qrData} setQrData={setQrData} />
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>
              
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <QRPreview qrData={qrData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
