
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.192a172e83904a359735ce732f633cd9',
  appName: 'chatty-kids-connection',
  webDir: 'dist',
  server: {
    url: 'https://192a172e-8390-4a35-9735-ce732f633cd9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: "#ffffffff"
  }
};

export default config;
