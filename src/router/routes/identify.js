export default [
  {
    path: '/identify',
    name: 'identify',
    component: () => import(/* webpackChunkName: "home" */ '@/components/Identify.vue')
  }
]
  