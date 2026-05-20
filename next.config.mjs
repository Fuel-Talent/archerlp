/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["sanity", "@sanity/vision", "next-sanity", "@sanity/ui"],
  webpack: (config) => {
    // Sanity's pre-bundled ESM imports `useEffectEvent` from React. Webpack's
    // static export analysis of React's CJS build can't statically prove the
    // export exists (it does — react@19.2 ships it), so we relax the strict
    // export-presence check that turns it into a build error.
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
