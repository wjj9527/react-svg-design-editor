import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index',redirect:'/editor' },
    { path: '/editor', component: '@/pages/Editor' },
  ],
  fastRefresh: {},
});
