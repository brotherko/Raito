import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/widgets/:instanceId',
      name: 'widgets',
      component: require('@/components/WidgetContainer').default,
    },
    {
      path: '/',
      name: 'Control Panel',
      component: require('@/components/ControlPanel').default
    },
  ]
})
