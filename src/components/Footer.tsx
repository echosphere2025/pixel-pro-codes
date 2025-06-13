
import { QrCode } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">Free QR Generator</span>
            </div>
            <p className="text-slate-300 mb-6">
              Generate QR codes instantly for free. No registration, no limits, 
              no cost. Create QR codes for URLs, text, Wi-Fi, contacts, and more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-blue-300">QR Code Types</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Website URLs</li>
              <li>Plain Text</li>
              <li>Email Addresses</li>
              <li>Phone Numbers</li>
              <li>Wi-Fi Networks</li>
              <li>Contact Cards (vCard)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-blue-300">FAQ</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>What is a QR Code?</li>
              <li>Where can I use it?</li>
              <li>How to scan QR codes?</li>
              <li>Is it really free?</li>
              <li>What formats are supported?</li>
              <li>Are there any limits?</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-400 mb-2">
            © 2024 Free QR Generator. All rights reserved. Generate QR codes for free, forever.
          </p>
          <p className="text-xs text-slate-500">
            App created by <span className="text-blue-400 font-medium">allsoftlink</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
