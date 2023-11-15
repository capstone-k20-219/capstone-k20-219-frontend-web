/** @type {import('next').NextConfig} */
import { join } from "path";

const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, "styles")],
  },
};

export default nextConfig;
