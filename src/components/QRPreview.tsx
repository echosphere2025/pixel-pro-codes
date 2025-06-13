
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
        await QRCode.toCanvas(canvasRef.current, qrData.content, {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>QR Code Preview</CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-700">100% Free</Badge>
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
            <span className="capitalize">{qrData.type}</span>
          </div>
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
            <strong>✅ Ready to Download:</strong> Your QR code is generated and ready for free download as a high-quality PNG file!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRPreview;
