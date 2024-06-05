import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a19d8e02 = () => interopDefault(import('..\\pages\\AddUser.vue' /* webpackChunkName: "pages/AddUser" */))
const _0112ebad = () => interopDefault(import('..\\pages\\appsList.vue' /* webpackChunkName: "pages/appsList" */))
const _c9503e3e = () => interopDefault(import('..\\pages\\serversList.vue' /* webpackChunkName: "pages/serversList" */))
const _40ef479f = () => interopDefault(import('..\\pages\\tasksList.vue' /* webpackChunkName: "pages/tasksList" */))
const _16710cca = () => interopDefault(import('..\\pages\\users\\UsersList.vue' /* webpackChunkName: "pages/users/UsersList" */))
const _29ff29a5 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _03c38d33 = () => interopDefault(import('..\\pages\\users\\_id\\index.vue' /* webpackChunkName: "pages/users/_id/index" */))

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
    component: _a19d8e02,
    name: "AddUser"
  }, {
    path: "/appsList",
    component: _0112ebad,
    name: "appsList"
  }, {
    path: "/serversList",
    component: _c9503e3e,
    name: "serversList"
  }, {
    path: "/tasksList",
    component: _40ef479f,
    name: "tasksList"
  }, {
    path: "/users/UsersList",
    component: _16710cca,
    name: "users-UsersList"
  }, {
    path: "/",
    component: _29ff29a5,
    name: "index"
  }, {
    path: "/users/:id",
    component: _03c38d33,
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
