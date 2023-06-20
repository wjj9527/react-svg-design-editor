import { defineConfig } from 'umi';

export default defineConfig({
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
