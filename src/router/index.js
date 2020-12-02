import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/ClientViews/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
    path: '/companion-home',
    name: 'CompanionHome',
    component: () => import('../views/CompanionViews/Home.vue'),
  },
  {
    path: '/companion-home-search-result',
    name: 'ShowClients',
    component: () => import('../views/CompanionViews/Pops/ShowClients.vue')
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
    name: 'AppFromCompanionMe',
    component: () => import('../views/CompanionViews/AppFromMe.vue')
  },
  {
    path: '/companion-applications-from-clients',
    name: 'AppFromClients',
    component: () => import('../views/CompanionViews/AppFromClients.vue')
  },
  {
    path: '/client-applications-from-me',
    name: 'AppFromClientMe',
    component: () => import('../views/ClientViews/AppFromMe.vue')
  },
  {
    path: '/client-applications-from-companions',
    name: 'AppFromCompanions',
    component: () => import('../views/ClientViews/AppFromCompanions.vue')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/client-orders',
    name: 'AllOrders',
    component: () => import('../views/ClientViews/AllOrders.vue')
  },
  {
    path: '/companion-orders',
    name: 'AllCompanionOrder',
    component: () => import('../views/CompanionViews/AllOrders.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
