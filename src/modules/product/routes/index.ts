export const PRODUCT_ROUTES = [
  {
    path: '/productos',
    name: 'product.list',
    component: () => import(/* webpackChunkName: "product-list" */ '../views/ProductsView.vue')
  },
  {
    path: '/productos/:productCode',
    name: 'product.detail',
    props: true,
    component: () => import(/* webpackChunkName: "product-detail" */ '../views/ProductView.vue')
  }
]
