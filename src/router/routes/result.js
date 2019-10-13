export default [
  {
    path: '/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "home" */ '@/components/Hasil.vue')
  }
]
