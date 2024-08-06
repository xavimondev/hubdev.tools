/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dbueuofxjmmgwozundjk.supabase.co',
      },
    ]

  }
}

export default nextConfig