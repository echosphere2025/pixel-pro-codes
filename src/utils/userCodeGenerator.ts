
// Generate unique code based on user's name (2 letters + 4 numbers)
export const generateUserCode = (name: string): string => {
  // Get initials from name
  const cleanName = name.replace(/[^a-zA-Z\s]/g, '').trim();
  const words = cleanName.split(' ').filter(word => word.length > 0);
  
  let initials = '';
  if (words.length >= 2) {
    initials = words[0][0] + words[1][0];
  } else if (words.length === 1) {
    initials = words[0].substring(0, 2);
  } else {
    initials = 'QR';
  }
  
  // Generate 4 random numbers
  const numbers = Math.floor(1000 + Math.random() * 9000);
  
  return (initials.toUpperCase() + numbers);
};

// Simple hash function for consistent code generation
export const generateConsistentCode = (name: string, email?: string): string => {
  const input = (name + (email || '')).toLowerCase().replace(/[^a-z]/g, '');
  let hash = 0;
  
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const letters = input.substring(0, 2).toUpperCase() || 'QR';
  const numbers = Math.abs(hash % 9000) + 1000;
  
  return letters + numbers;
};

// Validate user code format
export const isValidUserCode = (code: string): boolean => {
  const codePattern = /^[A-Z]{2}\d{4}$/;
  return codePattern.test(code);
};

// Save user data to localStorage
export const saveUserData = (userCode: string, userData: any) => {
  localStorage.setItem(`qr_user_${userCode}`, JSON.stringify(userData));
};

// Get user data from localStorage
export const getUserData = (userCode: string) => {
  const data = localStorage.getItem(`qr_user_${userCode}`);
  return data ? JSON.parse(data) : null;
};

// Save QR code data
export const saveQRCode = (userCode: string, qrIndex: number, qrData: any) => {
  const qrKey = `qr_${userCode}_${qrIndex}`;
  localStorage.setItem(qrKey, JSON.stringify(qrData));
};

// Get all QR codes for a user
export const getUserQRCodes = (userCode: string) => {
  const qrCodes = [];
  for (let i = 0; i < 20; i++) {
    const qrKey = `qr_${userCode}_${i}`;
    const qrData = localStorage.getItem(qrKey);
    if (qrData) {
      qrCodes.push({ index: i, data: JSON.parse(qrData) });
    }
  }
  return qrCodes;
};
