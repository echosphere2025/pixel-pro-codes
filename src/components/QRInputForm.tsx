
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRData } from "./QRGenerator";

interface QRInputFormProps {
  qrData: QRData;
  setQrData: (data: QRData) => void;
}

const QRInputForm = ({ qrData, setQrData }: QRInputFormProps) => {
  const [formData, setFormData] = useState({
    text: '',
    url: '',
    email: '',
    subject: '',
    body: '',
    phone: '',
    ssid: '',
    password: '',
    security: 'WPA',
    name: '',
    organization: '',
    phoneVcard: '',
    emailVcard: '',
    website: ''
  });

  const handleTypeChange = (type: QRData['type']) => {
    setQrData({ ...qrData, type, content: generateContent(type, formData) });
  };

  const handleFormDataChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    setQrData({ ...qrData, content: generateContent(qrData.type, newFormData) });
  };

  const generateContent = (type: QRData['type'], data: typeof formData): string => {
    switch (type) {
      case 'text':
        return data.text || 'Hello World!';
      case 'url':
        return data.url || 'https://example.com';
      case 'email':
        return `mailto:${data.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
      case 'phone':
        return `tel:${data.phone}`;
      case 'wifi':
        return `WIFI:T:${data.security};S:${data.ssid};P:${data.password};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nORG:${data.organization}\nTEL:${data.phoneVcard}\nEMAIL:${data.emailVcard}\nURL:${data.website}\nEND:VCARD`;
      default:
        return 'Hello World!';
    }
  };

  const renderInputFields = () => {
    switch (qrData.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                placeholder="Enter your text here..."
                value={formData.text}
                onChange={(e) => handleFormDataChange('text', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => handleFormDataChange('url', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@example.com"
                value={formData.email}
                onChange={(e) => handleFormDataChange('email', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject (Optional)</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={formData.subject}
                onChange={(e) => handleFormDataChange('subject', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="body">Message (Optional)</Label>
              <Textarea
                id="body"
                placeholder="Email message"
                value={formData.body}
                onChange={(e) => handleFormDataChange('body', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => handleFormDataChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ssid">Network Name (SSID)</Label>
              <Input
                id="ssid"
                placeholder="MyWiFiNetwork"
                value={formData.ssid}
                onChange={(e) => handleFormDataChange('ssid', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="WiFi password"
                value={formData.password}
                onChange={(e) => handleFormDataChange('password', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="security">Security Type</Label>
              <Select value={formData.security} onValueChange={(value) => handleFormDataChange('security', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">Open (No Password)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleFormDataChange('name', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="Company Name"
                value={formData.organization}
                onChange={(e) => handleFormDataChange('organization', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phoneVcard">Phone</Label>
              <Input
                id="phoneVcard"
                type="tel"
                placeholder="+1234567890"
                value={formData.phoneVcard}
                onChange={(e) => handleFormDataChange('phoneVcard', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="emailVcard">Email</Label>
              <Input
                id="emailVcard"
                type="email"
                placeholder="contact@example.com"
                value={formData.emailVcard}
                onChange={(e) => handleFormDataChange('emailVcard', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => handleFormDataChange('website', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="qr-type">QR Code Type</Label>
        <Select value={qrData.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Plain Text</SelectItem>
            <SelectItem value="url">Website URL</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone Number</SelectItem>
            <SelectItem value="wifi">WiFi Network</SelectItem>
            <SelectItem value="vcard">Contact Card (vCard)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderInputFields()}
    </div>
  );
};

export default QRInputForm;
