import { defineConfig } from 'umi';
import routes from '../routes';
import _ from 'lodash';
import { resolve } from 'path';
// console.log(Layouts, 'Layouts')
export default defineConfig({
  routes,
  favicon: '../public/favicon.ico',
  plugins: [],
  define: {
    // _: _.defaultTo
  },
  alias: {
    // 'utils': '../utils/index.js'
    '@utils': resolve(__dirname, '../src/utils'),
    '@routes': resolve(__dirname, '../routes'),
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    console.log(memo, env, webpack, createCSSRule, 'chainWebpack');
  },
});

// export default {
//   routes,
// }
