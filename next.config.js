// next.config.js
module.exports = {
    eslint: {
        // eslintのlint checkをbuild時にoff
        ignoreDuringBuilds: true,
    },
    // ... rest of the configuration.
    output: 'standalone',
}
