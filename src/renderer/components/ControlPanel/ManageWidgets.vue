<template>
  <div>
    <div v-for="(widget,widgetId) in widgetConfigs" :key="widgetId">
      {{ widgetId }}
      <div>Name: {{ widget.name }}</div>
      <div>description: {{ widget.desc }}</div>
      <button @click="createWidgetHandler(widgetId)">create</button>
      <manage-widgets-instances :widget-id="widgetId"></manage-widgets-instances>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { configs } from '@/widgets/';
import ManageWidgetsInstances from './ManageWidgetsInstances';

export default {
  name: 'manage-widgets',
  data: function() {
    return {
      widgetConfigs: configs,
    }
  },
  components: {
    ManageWidgetsInstances,
  },
  computed: {
    ...mapState(['Widgets']),
  },
  methods: {
    ...mapActions({
      'createWidget': 'Widgets/createWidget',
    }),
    createWidgetHandler: function(widgetId) {
      const hash = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
      const instanceId = `${widgetId}-${hash}`;

      const options = {
        position: [0, 0],
        width: 300,
        height: 150,
      }

      this.createWidget({
        instanceId,
        widgetId,
        options,
        locked: false,
        uri: `${window.location.origin}/#/widgets/${instanceId}`
      })
    },
  }
}
</script>
