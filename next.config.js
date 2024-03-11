const nextTranslate = require('next-translate-plugin');
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = nextTranslate({
  images: {
        domains: ['i.scdn.co'],
      }
  });

module.exports = nextConfig;