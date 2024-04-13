/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranslate = require("next-translate-plugin");
const dotenv = require("dotenv");
dotenv.config();

const nextConfig = nextTranslate({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
