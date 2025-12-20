import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MiApp',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      '192.168.0.100:3000',
      'localhost:3000'
    ]
  }
};

export default config;
