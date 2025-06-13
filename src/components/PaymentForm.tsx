
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Shield, Check } from "lucide-react";
import { generateConsistentCode, saveUserData } from "@/utils/userCodeGenerator";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormProps {
  onPaymentSuccess: (userCode: string, userName: string) => void;
}

const PaymentForm = ({ onPaymentSuccess }: PaymentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const userCode = generateConsistentCode(formData.name, formData.email);
      
      // Save user data
      const userData = {
        name: formData.name,
        email: formData.email,
        purchaseDate: new Date().toISOString(),
        qrCodesUsed: 0,
        maxQRCodes: 20
      };
      
      saveUserData(userCode, userData);
      
      toast({
        title: "Payment Successful!",
        description: `Your unique code is ${userCode}. Save it for future access!`,
      });
      
      setIsProcessing(false);
      onPaymentSuccess(userCode, formData.name);
    }, 2000);
  };

  const features = [
    "20 High-quality QR codes",
    "Multiple format downloads (PNG, SVG, PDF)",
    "Lifetime access with your unique code",
    "No watermarks or limitations",
    "Commercial use allowed"
  ];

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-green-600">$1</div>
            <div className="text-gray-600">for 20 QR codes</div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            {isProcessing ? 'Processing Payment...' : 'Pay $1 - Get 20 QR Codes'}
          </Button>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secure payment processing</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>What You Get</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Complete payment ($1)</li>
              <li>2. Get your unique access code (e.g., JD1234)</li>
              <li>3. Generate and download 20 QR codes</li>
              <li>4. Use your code anytime to access your QR codes</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
