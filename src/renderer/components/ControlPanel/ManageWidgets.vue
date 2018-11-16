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
import { setTimeout } from 'timers';

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
  created: function(){
  },

  methods: {
    ...mapActions({
      'createWidget': 'Widgets/createWidget',
    }),
    createWidgetHandler: function(widgetId) {
      this.createWidget({
        widgetId,
      })
    },
  }
}
</script>
