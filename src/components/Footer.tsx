
import { Upload } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="w-6 h-6 text-violet-400" />
              <span className="text-xl font-bold">AllSoftLink File Share</span>
            </div>
            <p className="text-slate-300 mb-4">
              Free, fast, and secure file sharing service. Upload and share files 
              instantly without any limits or advertisements.
            </p>
            <p className="text-sm text-slate-400">
              © 2024 allsoftlink.in. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-violet-300">Features</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Unlimited File Upload</li>
              <li>Secure File Storage</li>
              <li>Instant File Sharing</li>
              <li>No Registration Required</li>
              <li>Mobile Friendly</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-violet-300">Support</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Help Center</li>
              <li>Contact Support</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
