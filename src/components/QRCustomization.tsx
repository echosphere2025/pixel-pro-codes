
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { QRData } from "./QRGenerator";

interface QRCustomizationProps {
  qrData: QRData;
  setQrData: (data: QRData) => void;
}

const QRCustomization = ({ qrData, setQrData }: QRCustomizationProps) => {
  const handleSizeChange = (value: number[]) => {
    setQrData({ ...qrData, size: value[0] });
  };

  const handleColorChange = (field: 'foregroundColor' | 'backgroundColor', color: string) => {
    setQrData({ ...qrData, [field]: color });
  };

  const handleErrorCorrectionChange = (level: QRData['errorCorrection']) => {
    setQrData({ ...qrData, errorCorrection: level });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrData({ ...qrData, logo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="size">Size: {qrData.size}px</Label>
        <div className="mt-2">
          <Slider
            value={[qrData.size]}
            onValueChange={handleSizeChange}
            min={128}
            max={512}
            step={32}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="foreground-color">Foreground Color</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="foreground-color"
              type="color"
              value={qrData.foregroundColor}
              onChange={(e) => handleColorChange('foregroundColor', e.target.value)}
              className="w-12 h-10 p-1 border-2"
            />
            <Input
              type="text"
              value={qrData.foregroundColor}
              onChange={(e) => handleColorChange('foregroundColor', e.target.value)}
              className="flex-1"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="background-color">Background Color</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="background-color"
              type="color"
              value={qrData.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="w-12 h-10 p-1 border-2"
            />
            <Input
              type="text"
              value={qrData.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="flex-1"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="error-correction">Error Correction Level</Label>
        <Select value={qrData.errorCorrection} onValueChange={handleErrorCorrectionChange}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (~7%)</SelectItem>
            <SelectItem value="M">Medium (~15%)</SelectItem>
            <SelectItem value="Q">Quartile (~25%)</SelectItem>
            <SelectItem value="H">High (~30%)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          Higher levels allow more damage but create larger QR codes
        </p>
      </div>

      <div>
        <Label htmlFor="logo">Logo Upload (Optional)</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Upload a logo to embed in the center of your QR code
        </p>
      </div>

      <div className="p-4 bg-secondary/20 rounded-lg border">
        <h4 className="font-medium mb-2">Color Presets</h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: 'Classic', fg: '#000000', bg: '#ffffff' },
            { name: 'Blue', fg: '#1e40af', bg: '#dbeafe' },
            { name: 'Green', fg: '#047857', bg: '#d1fae5' },
            { name: 'Purple', fg: '#7c3aed', bg: '#ede9fe' },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setQrData({
                  ...qrData,
                  foregroundColor: preset.fg,
                  backgroundColor: preset.bg,
                });
              }}
              className="p-2 rounded border hover:bg-secondary/40 transition-colors"
            >
              <div className="w-full h-6 rounded mb-1" style={{ backgroundColor: preset.bg }}>
                <div className="w-4 h-4 rounded-sm mx-auto" style={{ backgroundColor: preset.fg }} />
              </div>
              <span className="text-xs">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRCustomization;
