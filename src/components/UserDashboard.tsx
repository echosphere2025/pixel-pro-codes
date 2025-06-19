import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Plus, User, Calendar, Trash2 } from "lucide-react";
import QRInputForm from "./QRInputForm";
import QRPreview from "./QRPreview";
import { QRData } from "./QRGenerator";
import { saveQRCode, getUserQRCodes, saveUserData, getUserData, deleteQRCode } from "@/utils/userCodeGenerator";
import { useToast } from "@/hooks/use-toast";

interface UserDashboardProps {
  userCode: string;
  userData: any;
  onBack: () => void;
}

const UserDashboard = ({ userCode, userData, onBack }: UserDashboardProps) => {
  const { toast } = useToast();
  const [currentQRData, setCurrentQRData] = useState<QRData>({
    type: 'text',
    content: 'Hello World!',
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrection: 'M'
  });
  
  const [savedQRs, setSavedQRs] = useState<any[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(userData);

  useEffect(() => {
    // Load saved QR codes
    const qrCodes = getUserQRCodes(userCode);
    setSavedQRs(qrCodes);
  }, [userCode]);

  const handleSaveQR = () => {
    if (currentUserData.qrCodesUsed >= currentUserData.maxQRCodes) {
      toast({
        title: "Limit Reached",
        description: "You've used all 20 QR codes. Purchase more to continue.",
        variant: "destructive",
      });
      return;
    }

    const qrIndex = currentUserData.qrCodesUsed;
    const qrDataToSave = {
      ...currentQRData,
      createdAt: new Date().toISOString(),
      id: `${userCode}_${qrIndex}`
    };

    saveQRCode(userCode, qrIndex, qrDataToSave);
    
    // Update user data
    const updatedUserData = {
      ...currentUserData,
      qrCodesUsed: currentUserData.qrCodesUsed + 1
    };
    setCurrentUserData(updatedUserData);
    saveUserData(userCode, updatedUserData);

    // Refresh saved QRs
    const qrCodes = getUserQRCodes(userCode);
    setSavedQRs(qrCodes);

    toast({
      title: "QR Code Saved!",
      description: `QR code ${qrIndex + 1}/20 saved successfully.`,
    });

    setShowGenerator(false);
  };

  const handleDeleteQR = (qrIndex: number) => {
    deleteQRCode(userCode, qrIndex);
    
    // Refresh saved QRs
    const qrCodes = getUserQRCodes(userCode);
    setSavedQRs(qrCodes);

    toast({
      title: "QR Code Deleted",
      description: "The QR code has been removed successfully.",
    });
  };

  const handleDownloadQR = (qrData: any) => {
    // This would trigger download of the specific QR code
    toast({
      title: "Downloading QR Code",
      description: "Your QR code is being downloaded.",
    });
  };

  const remainingQRs = currentUserData.maxQRCodes - currentUserData.qrCodesUsed;

  if (showGenerator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setShowGenerator(false)}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Create QR Code ({currentUserData.qrCodesUsed + 1}/20)</CardTitle>
                </CardHeader>
                <CardContent>
                  <QRInputForm qrData={currentQRData} setQrData={setCurrentQRData} />
                </CardContent>
              </Card>

              <Button 
                onClick={handleSaveQR}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={remainingQRs <= 0}
              >
                Save QR Code ({remainingQRs} remaining)
              </Button>
            </div>

            <div className="lg:sticky lg:top-8">
              <QRPreview qrData={currentQRData} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {currentUserData.name}
                  </div>
                  <div>
                    <span className="font-medium">Code:</span> 
                    <Badge variant="secondary" className="ml-2">{userCode}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm text-gray-600">
                      Purchased: {new Date(currentUserData.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>QR Code Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {currentUserData.qrCodesUsed}/{currentUserData.maxQRCodes}
                  </div>
                  <div className="text-gray-600">QR codes used</div>
                  <div className="mt-2">
                    <Badge variant={remainingQRs > 5 ? "default" : "destructive"}>
                      {remainingQRs} remaining
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowGenerator(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={remainingQRs <= 0}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              {savedQRs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No QR codes created yet. Click "Create New QR Code" to get started!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedQRs.map((qr, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-2">
                          QR Code #{qr.index + 1}
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          Type: {qr.data.type}
                        </div>
                        {qr.data.mediaType && (
                          <div className="text-xs text-gray-600 mb-2">
                            Media: {qr.data.mediaType}
                          </div>
                        )}
                        {qr.data.fileName && (
                          <div className="text-xs text-gray-600 mb-2 truncate">
                            File: {qr.data.fileName}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mb-3">
                          Created: {new Date(qr.data.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadQR(qr.data)}
                            className="flex-1"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteQR(qr.index)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
