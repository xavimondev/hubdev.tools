/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    loader: 'custom',
    loaderFile: './loader/cloudinary.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dbueuofxjmmgwozundjk.supabase.co',
      },
    ],
    minimumCacheTTL: 2678400, // 31 days
    qualities: [50, 75]
  },
  transpilePackages: ['geist'],
}

export default nextConfig