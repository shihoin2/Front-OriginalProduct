// next.config.js
module.exports = {
    eslint: {
        // eslintのlint checkをbuild時にoff
        ignoreDuringBuilds: true,
    },
    // ... rest of the configuration.
    output: 'standalone',
    images: {
        domains: [
            'via.placeholder.com',
            's3.ap-northeast-1.amazonaws.com',
            'mogusapo.s3.ap-northeast-1.amazonaws.com',
        ],
    },
}
