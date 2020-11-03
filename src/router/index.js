import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/ClientViews/Home.vue'
// Components for Companions
import Orders from '../views/CompanionViews/Orders.vue'
import MyAds from '../views/CompanionViews/MyAds.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  // },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName */ '../views/ClientViews/History.vue')
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import(/* webpackChunkName */ '../views/Payments.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName */ '../views/ClientViews/Account.vue')
  },
  {
    path: '/registr',
    name: 'Registr',
    component: () => import('../views/Registr.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sidenav',
    name: 'Sidenav',
    component: () => import('../components/SideNav.vue')
  },
  {
    path: '/configAccount',
    name: 'ConfigAccount',
    component: () => import('../views/ConfigAccount.vue')
  },
  {
    path: '/companionHome',
    name: 'CompanionHome',
    component: () => import('../views/CompanionViews/Home.vue'),
    children: [
      {
        path: 'orders',
        name: 'Orders',
        component: Orders
      },
      {
        path: 'myads',
        name: 'MyAds',
        component: MyAds
      }
    ]
  },
  {
    path: '/companion-new-order',
    name: 'NewOrder',
    component: () => import('../views/CompanionViews/Pops/NewOrder.vue')
  },
  {
    path: '/companion-history',
    name: 'CompanionHistory',
    component: () => import('../views/CompanionViews/History.vue')
  },
  {
    path: '/show-companions',
    name: 'ShowCompanions',
    component: () => import('../views/ClientViews/ShowCompanions.vue')
  },
  {
    path: '/companion-applications-from-me',
    name: 'AppFromMe',
    component: () => import('../views/CompanionViews/AppFromMe.vue')
  },
  {
    path: '/companion-applications-from-clients',
    name: 'AppFromClients',
    component: () => import('../views/CompanionViews/AppFromClients.vue')
  },
  {
    path: '/client-applications-from-me',
    name: 'AppFromMe',
    component: () => import('../views/ClientViews/AppFromMe.vue')
  },
  {
    path: '/client-applications-from-companions',
    name: 'AppFromCompanions',
    component: () => import('../views/ClientViews/AppFromCompanions.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
