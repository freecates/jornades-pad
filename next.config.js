/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cms.aracultura.com',
                port: '',
            },
        ],
    },
};

module.exports = nextConfig
