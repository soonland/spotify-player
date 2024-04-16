/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranslate = require("next-translate-plugin");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
dotenv.config();

const nextConfig = nextTranslate({
  env: {
    NEXT_PUBLIC_BUILD_TIMESTAMP: dayjs().format("YYYYMMDD-HHmmss"),
  },
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
