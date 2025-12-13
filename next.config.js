const nextTranslate = require("next-translate-plugin");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const nextConfig = nextTranslate({
  env: {
    NEXT_PUBLIC_BUILD_TIMESTAMP: dayjs().tz("America/Montreal").format("[build time]: YYYYMMDD.HHmmss"),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: ["@mui/x-data-grid"],
  turbopack: {}
});

module.exports = nextConfig;
