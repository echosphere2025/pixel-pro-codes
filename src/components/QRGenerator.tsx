
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Palette, Settings } from "lucide-react";
import QRInputForm from "./QRInputForm";
import QRCustomization from "./QRCustomization";
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
  
  const [activeTab, setActiveTab] = useState<'input' | 'customize'>('input');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "QR Code Generated!",
        description: "Your QR code is ready. Purchase to download high-resolution version.",
      });
    }, 1000);
  };

  const handlePurchase = () => {
    toast({
      title: "Payment Integration",
      description: "Payment gateway will be integrated here for $1 downloads.",
    });
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">QR Code Generator</h1>
          <p className="text-muted-foreground">Create professional QR codes with custom styling</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex space-x-4 border-b">
                  <button
                    onClick={() => setActiveTab('input')}
                    className={`flex items-center space-x-2 pb-2 px-1 transition-colors ${
                      activeTab === 'input' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Content</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('customize')}
                    className={`flex items-center space-x-2 pb-2 px-1 transition-colors ${
                      activeTab === 'customize' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                    <span>Customize</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === 'input' ? (
                  <QRInputForm qrData={qrData} setQrData={setQrData} />
                ) : (
                  <QRCustomization qrData={qrData} setQrData={setQrData} />
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>
              
              <Button 
                onClick={handlePurchase}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download HD ($1)
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
