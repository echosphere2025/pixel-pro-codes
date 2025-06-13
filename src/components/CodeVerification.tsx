
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft } from "lucide-react";
import { isValidUserCode, getUserData } from "@/utils/userCodeGenerator";
import { useToast } from "@/hooks/use-toast";

interface CodeVerificationProps {
  onCodeVerified: (userCode: string, userData: any) => void;
  onBack: () => void;
}

const CodeVerification = ({ onCodeVerified, onBack }: CodeVerificationProps) => {
  const { toast } = useToast();
  const [userCode, setUserCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCode = async () => {
    if (!userCode.trim()) {
      toast({
        title: "Enter Code",
        description: "Please enter your unique access code.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUserCode(userCode.toUpperCase())) {
      toast({
        title: "Invalid Format",
        description: "Code must be 2 letters followed by 4 numbers (e.g., AB1234).",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      const userData = getUserData(userCode.toUpperCase());
      
      if (userData) {
        toast({
          title: "Access Granted!",
          description: `Welcome back, ${userData.name}!`,
        });
        onCodeVerified(userCode.toUpperCase(), userData);
      } else {
        toast({
          title: "Code Not Found",
          description: "This access code doesn't exist. Please check and try again.",
          variant: "destructive",
        });
      }
      
      setIsVerifying(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <KeyRound className="w-12 h-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Enter Access Code</CardTitle>
            <p className="text-gray-600">
              Enter your unique code to access your QR codes
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="userCode">Your Unique Code</Label>
              <Input
                id="userCode"
                placeholder="AB1234"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono tracking-wider"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Format: 2 letters + 4 numbers (e.g., JD1234)
              </p>
            </div>

            <Button 
              onClick={handleVerifyCode}
              disabled={isVerifying}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isVerifying ? 'Verifying...' : 'Access My QR Codes'}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>Don't have a code yet?</p>
              <Button variant="link" onClick={onBack} className="p-0 h-auto">
                Purchase 20 QR codes for $1
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeVerification;
