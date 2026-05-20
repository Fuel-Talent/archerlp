/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `react` is included here so webpack re-parses its CJS source and picks
  // up every named export (including `useEffectEvent`, which Sanity Studio
  // imports). Without this, React's conditional `index.js` re-export defeats
  // webpack's lexer and the export ends up undefined on the bundled namespace.
  transpilePackages: ["sanity", "@sanity/vision", "next-sanity", "@sanity/ui", "react"],
  webpack: (config) => {
    config.module.parser = config.module.parser || {};
    config.module.parser.javascript = {
      ...(config.module.parser.javascript || {}),
      exportsPresence: false,
      reexportExportsPresence: false,
      importExportsPresence: false,
    };
    return config;
  },
};

export default nextConfig;
