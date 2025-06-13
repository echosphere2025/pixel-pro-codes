
import { useState } from "react";
import Hero from "@/components/Hero";
import QRGenerator from "@/components/QRGenerator";
import PaymentForm from "@/components/PaymentForm";
import CodeVerification from "@/components/CodeVerification";
import UserDashboard from "@/components/UserDashboard";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

type AppMode = 'home' | 'payment' | 'verification' | 'dashboard' | 'preview';

const Index = () => {
  const [mode, setMode] = useState<AppMode>('home');
  const [userCode, setUserCode] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);

  const handleGetStarted = () => {
    setMode('payment');
  };

  const handlePaymentSuccess = (code: string, userName: string) => {
    setUserCode(code);
    // Get updated user data
    const userData = JSON.parse(localStorage.getItem(`qr_user_${code}`) || '{}');
    setUserData(userData);
    setMode('dashboard');
  };

  const handleCodeVerified = (code: string, data: any) => {
    setUserCode(code);
    setUserData(data);
    setMode('dashboard');
  };

  const handleBack = () => {
    setMode('home');
    setUserCode('');
    setUserData(null);
  };

  const handlePreview = () => {
    setMode('preview');
  };

  return (
    <div className="min-h-screen bg-background">
      {mode === 'home' && (
        <>
          <Hero 
            onGetStarted={handleGetStarted} 
            onPreview={handlePreview}
            onVerifyCode={() => setMode('verification')}
          />
          <Features />
          <FAQ />
          <Footer />
        </>
      )}
      
      {mode === 'payment' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
          <div className="w-full">
            <div className="text-center mb-8">
              <button 
                onClick={handleBack}
                className="mb-4 text-blue-600 hover:text-blue-800"
              >
                ← Back to Home
              </button>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Get 20 QR Codes for $1
              </h1>
              <p className="text-gray-600 text-lg">One-time payment, lifetime access with your unique code</p>
            </div>
            <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
          </div>
        </div>
      )}
      
      {mode === 'verification' && (
        <CodeVerification 
          onCodeVerified={handleCodeVerified}
          onBack={handleBack}
        />
      )}
      
      {mode === 'dashboard' && userCode && userData && (
        <UserDashboard 
          userCode={userCode}
          userData={userData}
          onBack={handleBack}
        />
      )}
      
      {mode === 'preview' && (
        <QRGenerator onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
