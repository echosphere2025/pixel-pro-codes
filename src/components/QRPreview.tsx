
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QRCode from "qrcode";
import { QRData } from "./QRGenerator";

interface QRPreviewProps {
  qrData: QRData;
}

const QRPreview = ({ qrData }: QRPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      try {
        // For media types, we'll encode the media data directly
        // In a real application, you'd want to upload to a server and use a URL
        let qrContent = qrData.content;
        
        if (qrData.type === 'media' && qrData.mediaType) {
          // For demo purposes, we'll use the base64 data directly
          // In production, you'd upload to a server and use the URL
          qrContent = qrData.content;
        }

        await QRCode.toCanvas(canvasRef.current, qrContent, {
          width: qrData.size,
          color: {
            dark: qrData.foregroundColor,
            light: qrData.backgroundColor,
          },
          errorCorrectionLevel: qrData.errorCorrection,
          margin: 2,
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [qrData]);

  const getTypeDisplay = () => {
    if (qrData.type === 'media' && qrData.mediaType) {
      return `${qrData.mediaType} file`;
    }
    return qrData.type;
  };

  const getMediaTypeColor = () => {
    if (qrData.type === 'media') {
      switch (qrData.mediaType) {
        case 'photo': return 'bg-blue-100 text-blue-700';
        case 'audio': return 'bg-green-100 text-green-700';
        case 'video': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    }
    return 'bg-green-100 text-green-700';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>QR Code Preview</CardTitle>
          <Badge variant="secondary" className={getMediaTypeColor()}>
            {qrData.type === 'media' ? `${qrData.mediaType} QR` : '100% Free'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative p-4 bg-white rounded-lg shadow-sm border">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto"
            />
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="capitalize">{getTypeDisplay()}</span>
          </div>
          {qrData.fileName && (
            <div className="flex justify-between">
              <span>File:</span>
              <span className="truncate max-w-32" title={qrData.fileName}>
                {qrData.fileName}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Size:</span>
            <span>{qrData.size}×{qrData.size}px</span>
          </div>
          <div className="flex justify-between">
            <span>Format:</span>
            <span>PNG</span>
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700">
            <strong>✅ Ready to Download:</strong> 
            {qrData.type === 'media' 
              ? ` Your ${qrData.mediaType} QR code is ready! When scanned, it will provide access to your media file.`
              : ' Your QR code is generated and ready for free download as a high-quality PNG file!'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRPreview;
