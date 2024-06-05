import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7c509cbe = () => interopDefault(import('..\\pages\\AddUser.vue' /* webpackChunkName: "pages/AddUser" */))
const _433b874b = () => interopDefault(import('..\\pages\\appsList.vue' /* webpackChunkName: "pages/appsList" */))
const _e2258efa = () => interopDefault(import('..\\pages\\serversList.vue' /* webpackChunkName: "pages/serversList" */))
const _43da1fc1 = () => interopDefault(import('..\\pages\\tasksList.vue' /* webpackChunkName: "pages/tasksList" */))
const _ff3cd18e = () => interopDefault(import('..\\pages\\users\\UsersList.vue' /* webpackChunkName: "pages/users/UsersList" */))
const _6fcf62c7 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _2925b956 = () => interopDefault(import('..\\pages\\users\\_id\\index.vue' /* webpackChunkName: "pages/users/_id/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/AddUser",
    component: _7c509cbe,
    name: "AddUser"
  }, {
    path: "/appsList",
    component: _433b874b,
    name: "appsList"
  }, {
    path: "/serversList",
    component: _e2258efa,
    name: "serversList"
  }, {
    path: "/tasksList",
    component: _43da1fc1,
    name: "tasksList"
  }, {
    path: "/users/UsersList",
    component: _ff3cd18e,
    name: "users-UsersList"
  }, {
    path: "/",
    component: _6fcf62c7,
    name: "index"
  }, {
    path: "/users/:id",
    component: _2925b956,
    name: "users-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
