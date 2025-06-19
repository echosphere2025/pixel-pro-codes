
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, FileAudio, FileVideo, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaCaptureProps {
  onMediaCapture: (mediaData: string, mediaType: 'photo' | 'audio' | 'video', fileName?: string) => void;
}

const MediaCapture = ({ onMediaCapture }: MediaCaptureProps) => {
  const { toast } = useToast();
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
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
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedPhoto(imageData);
      stopCamera();
      
      toast({
        title: "Photo Captured!",
        description: "Review your photo and click 'Use Photo' to create QR code.",
      });
    }
  };

  const usePhoto = () => {
    if (capturedPhoto) {
      onMediaCapture(capturedPhoto, 'photo', `photo_${Date.now()}.jpg`);
      setCapturedPhoto('');
      toast({
        title: "Photo Converted!",
        description: "Your photo has been converted to a QR code.",
      });
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto('');
    startCamera();
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

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (file.type.startsWith('image/')) {
        onMediaCapture(result, 'photo', file.name);
        toast({
          title: "Image Uploaded!",
          description: "Your image has been converted to a QR code.",
        });
      } else if (file.type.startsWith('audio/')) {
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
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Camera Capture</span>
          </h3>
          
          {capturedPhoto ? (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={capturedPhoto}
                  alt="Captured photo"
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={usePhoto}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Use Photo
                </Button>
                
                <Button 
                  onClick={retakePhoto}
                  variant="outline"
                  className="flex-1"
                >
                  Retake
                </Button>
              </div>
            </div>
          ) : !isCapturing ? (
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
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Media Files</span>
          </h3>
          
          <div>
            <Label htmlFor="mediaFile">Select Image, Audio, or Video File</Label>
            <Input
              id="mediaFile"
              ref={fileInputRef}
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={handleFileUpload}
              className="cursor-pointer mt-2"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
              <Image className="w-4 h-4 text-blue-600" />
              <span>Images (JPG, PNG, GIF)</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
              <FileAudio className="w-4 h-4 text-green-600" />
              <span>Audio (MP3, WAV, etc.)</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded">
              <FileVideo className="w-4 h-4 text-purple-600" />
              <span>Video (MP4, AVI, etc.)</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> Maximum file size is 50MB. When scanned, your QR code will provide access to download the original media file.
            </p>
          </div>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default MediaCapture;
