import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Bar = { template: '<div>bar</div>' }
export default new Router({
  routes: [
    {
      path: '/weather',
      name: 'weather',
      component: require('@/components/WeatherWidget').default
    },
    {
      path: '/',
      name: 'Control Panel',
      component: require('@/components/ControlPanel').default
    },
  ]
})
