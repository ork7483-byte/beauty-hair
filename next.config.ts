import type { NextConfig } from "next";
import path from "path";

// Turbopack panics on non-ASCII (Korean) characters in the project directory
// path (known Turbopack bug). Use --webpack flag when building/developing.
// The turbopack.root setting suppresses the multi-lockfile workspace warning.
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
