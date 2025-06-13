
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
        });

        // Add watermark for preview
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = '#666666';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('PREVIEW', qrData.size / 2, qrData.size / 2);
          ctx.restore();
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [qrData]);

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Preview</CardTitle>
          <Badge variant="secondary">Free Preview</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border rounded-lg shadow-sm max-w-full h-auto"
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
            <span>Error Correction:</span>
            <span>{qrData.errorCorrection}</span>
          </div>
        </div>

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>💡 Pro Tip:</strong> Purchase for $1 to download high-resolution PNG, SVG, or PDF without watermarks!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRPreview;
