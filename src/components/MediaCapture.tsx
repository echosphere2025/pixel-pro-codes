
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, FileAudio, FileVideo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaCaptureProps {
  onMediaCapture: (mediaData: string, mediaType: 'photo' | 'audio' | 'video', fileName?: string) => void;
}

const MediaCapture = ({ onMediaCapture }: MediaCaptureProps) => {
  const { toast } = useToast();
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/png');
      onMediaCapture(imageData, 'photo');
      
      stopCamera();
      toast({
        title: "Photo Captured!",
        description: "Your photo has been converted to a QR code.",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (file.type.startsWith('audio/')) {
        onMediaCapture(result, 'audio', file.name);
        toast({
          title: "Audio Uploaded!",
          description: "Your audio file has been converted to a QR code.",
        });
      } else if (file.type.startsWith('video/')) {
        onMediaCapture(result, 'video', file.name);
        toast({
          title: "Video Uploaded!",
          description: "Your video file has been converted to a QR code.",
        });
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="w-5 h-5" />
          <span>Media Capture</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Camera Capture</h3>
          
          {!isCapturing ? (
            <Button 
              onClick={startCamera}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover"
                  autoPlay
                  playsInline
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={capturePhoto}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </Button>
                
                <Button 
                  onClick={stopCamera}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Media Files</h3>
          
          <div>
            <Label htmlFor="mediaFile">Select Audio or Video File</Label>
            <Input
              id="mediaFile"
              ref={fileInputRef}
              type="file"
              accept="audio/*,video/*"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileAudio className="w-4 h-4" />
              <span>Audio files supported</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileVideo className="w-4 h-4" />
              <span>Video files supported</span>
            </div>
          </div>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default MediaCapture;
