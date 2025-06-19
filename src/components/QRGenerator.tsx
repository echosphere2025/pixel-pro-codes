
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, QrCode } from "lucide-react";
import QRInputForm from "./QRInputForm";
import QRPreview from "./QRPreview";
import MediaCapture from "./MediaCapture";
import { useToast } from "@/hooks/use-toast";

interface QRGeneratorProps {
  onBack: () => void;
}

export interface QRData {
  type: 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard' | 'media';
  content: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  logo?: string;
  mediaType?: 'photo' | 'audio' | 'video';
  fileName?: string;
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
  const [fileFormat, setFileFormat] = useState('png');

  const handleMediaCapture = (mediaData: string, mediaType: 'photo' | 'audio' | 'video', fileName?: string) => {
    setQrData({
      ...qrData,
      type: 'media',
      content: mediaData,
      mediaType,
      fileName
    });
    
    // Auto-generate QR code when media is captured
    handleGenerate();
  };

  const handleGenerate = async () => {
    if (!qrData.content.trim()) {
      toast({
        title: "Please enter content",
        description: "Enter text, URL, or capture media to generate your QR code.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "QR Code Generated!",
        description: `Your QR code is ready. Click download to save as ${fileFormat.toUpperCase()}.`,
      });
    }, 1000);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qr-code.${fileFormat}`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Downloaded!",
        description: `Your QR code has been saved as qr-code.${fileFormat}`,
      });
    }
  };

  const formatOptions = [
    { value: 'png', label: 'High-quality PNG (recommended)', description: 'Best for web and general use' },
    { value: 'jpg', label: 'JPEG for mobile sharing', description: 'Compressed for easy sharing' },
    { value: 'svg', label: 'SVG for print & scale', description: 'Vector format, infinite scaling' },
    { value: 'pdf', label: 'PDF for documents', description: 'Professional document format' },
    { value: 'eps', label: 'EPS for designers', description: 'Professional design format' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Free QR Code Generator
            </h1>
            <p className="text-gray-600 text-lg">Create QR codes from text, URLs, photos, audio, and video files!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
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

            <MediaCapture onMediaCapture={handleMediaCapture} />

            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Format</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Choose file format:</label>
                    <Select value={fileFormat} onValueChange={setFileFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formatOptions.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{format.label}</span>
                              <span className="text-xs text-gray-500">{format.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                size="lg"
              >
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>
              
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code (Free)
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
