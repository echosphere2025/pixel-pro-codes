
import { QrCode, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">Free QR Generator</span>
            </div>
            <p className="text-slate-300 mb-6">
              Generate QR codes instantly for free. No registration, no limits, 
              no cost. Create QR codes for URLs, text, Wi-Fi, contacts, and more.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-slate-700 hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-700 hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-700 hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-700 hover:bg-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
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
            <h3 className="font-semibold mb-4 text-blue-300">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>How to Scan QR Codes</li>
              <li>QR Code Best Practices</li>
              <li>Business Use Cases</li>
              <li>Marketing Tips</li>
              <li>Technical Support</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © 2024 Free QR Generator. All rights reserved. Generate QR codes for free, forever.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
