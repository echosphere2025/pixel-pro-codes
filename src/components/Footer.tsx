
import { QrCode } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/10 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">QR Generator Pro</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The professional way to create and download high-quality QR codes. 
              No ads, no sign-up, just pure functionality.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 QR Generator Pro. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>QR Code Generator</li>
              <li>Barcode Generator</li>
              <li>Custom Styling</li>
              <li>High Resolution</li>
              <li>Multiple Formats</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Contact Support</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
