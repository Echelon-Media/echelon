const TerserPlugin = require('terser-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: "/ne100/:path*",
        destination: "https://ne100.echelon.lk/:path*",
        permanent: true,
      },
      {
        source: "/the-people",
        destination: "/about-us",
        permanent: false,
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    // JavaScript Minification
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Removes console.log() in production
            },
          },
        }),
      ];
    }

    // CSS Optimization using PostCSS
    if (!dev) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')(),
                  require('cssnano')({ preset: 'default' }), // Minifies CSS
                ],
              },
            },
          },
        ],
      });
    }

    return config;
  },
};
