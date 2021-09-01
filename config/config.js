import { defineConfig } from 'umi';
import routes from '../routes';
// console.log(Layouts, 'Layouts')
export default defineConfig({
  routes,
  favicon: '../public/favicon.ico',
  404: true,
  plugins: [],
});

// export default {
//   routes,
// }
