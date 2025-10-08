/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for deployment to static hosting platforms
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Enable trailing slash for better static hosting compatibility
  trailingSlash: true,
  
  // Compress static files
  compress: true,
}

module.exports = nextConfig
