/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/html/testing.html',
            },
        ]
    }
}

module.exports = nextConfig