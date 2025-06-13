
import { useState } from "react";
import Hero from "@/components/Hero";
import QRGenerator from "@/components/QRGenerator";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!showGenerator ? (
        <>
          <Hero onGetStarted={() => setShowGenerator(true)} />
          <Features />
          <Pricing />
          <Footer />
        </>
      ) : (
        <QRGenerator onBack={() => setShowGenerator(false)} />
      )}
    </div>
  );
};

export default Index;
