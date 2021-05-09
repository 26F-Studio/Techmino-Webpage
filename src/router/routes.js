const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'register', component: () => import('pages/Register.vue')},
      {path: 'login', component: () => import('pages/Login.vue')},
      {path: 'profile', component: () => import('pages/Profile.vue')},
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes
