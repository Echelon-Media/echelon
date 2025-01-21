const path = require('path');

module.exports = {
  entry: [
    'react-app-polyfill/ie11', // Must be loaded first for IE11 compatibility
    'react-app-polyfill/stable', // Ensures stable polyfills are included
    path.resolve(__dirname, 'src/index.js') // Your application entry point
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development', // Use 'production' for optimized builds
  target: ['web', 'es5'], // Ensure compatibility with older browsers like IE11
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // Transpile modern JavaScript for older browsers
              '@babel/preset-react' // Transpile React JSX
            ],
            plugins: [
              '@babel/plugin-transform-runtime' // Optimizes code reuse
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // For handling CSS imports
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource' // For handling images
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file extensions
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    compress: true,
    port: 3000, // Your development server port
    open: true // Automatically open the app in the browser
  }
};
