import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/weather',
      name: 'weather',
      component: require('@/components/WidgetContainer').default,
      props: { widget: 'Weather' }
    },
    {
      path: '/',
      name: 'Control Panel',
      component: require('@/components/ControlPanel').default
    },
  ]
})
