const nextTranslate = require('next-translate-plugin');
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = nextTranslate({
  images: {
        remotePatterns: [{ hostname: 'i.scdn.co'}],
      }
  });

module.exports = nextConfig;