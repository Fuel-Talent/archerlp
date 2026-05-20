import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["sanity", "@sanity/vision", "next-sanity", "@sanity/ui"],
  webpack: (config, { dev }) => {
    config.module.parser = config.module.parser || {};
    config.module.parser.javascript = {
      ...(config.module.parser.javascript || {}),
      exportsPresence: false,
      reexportExportsPresence: false,
      importExportsPresence: false,
    };

    // React 19.2's `index.js` uses a conditional `module.exports = require(...)`
    // that defeats webpack's CJS-named-export detection — `useEffectEvent`
    // never lands on the bundled namespace, so Sanity's `useEffectEvent(...)`
    // call resolves to undefined at runtime. Resolve `react` directly to the
    // matching CJS build (absolute path bypasses React's strict `exports` field)
    // so the lexer can see every named export. Exact-match `react$` so
    // `react/jsx-runtime` etc. still go through the package exports field.
    const reactCjs = path.resolve(
      __dirname,
      "node_modules/react/cjs",
      dev ? "react.development.js" : "react.production.js"
    );
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react$: reactCjs,
    };

    return config;
  },
};

export default nextConfig;
