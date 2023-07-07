import { defineConfig } from 'umi';
// const path = require('path')
// console.log(path.resolve(__dirname,'src/image'))
export default defineConfig({
  // alias:{
  //   '@image':path.resolve(__dirname,'src/image')
  // },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index', redirect: '/editor' },
    { path: '/editor', component: '@/pages/Editor' },
  ],
  fastRefresh: {},
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
});
