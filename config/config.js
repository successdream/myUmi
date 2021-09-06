import { defineConfig } from 'umi';
import routes from '../routes';
import _ from 'lodash';
import { resolve } from 'path';
// console.log(Layouts, 'Layouts')
export default defineConfig({
  routes,
  favicon: '../public/favicon.ico',
  plugins: [],
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  define: {
    // _: _.defaultTo
  },
  alias: {
    // 'utils': '../utils/index.js'
    '@utils': resolve(__dirname, '../src/utils'),
    '@routes': resolve(__dirname, '../routes'),
    '@services': resolve(__dirname, '../src/services'),
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    console.log(memo, env, webpack, createCSSRule, 'chainWebpack');
  },
  proxy: {
    '/api': {
      target: 'http://10.204.231.102',
      changeOrigin: true,
    },
  },
  dva: {
    immer: true,
    hmr: true,
  },
});

// export default {
//   routes,
// }
