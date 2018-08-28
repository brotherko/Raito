<template>
<div>
  <div v-for="(instance, instanceId) in getInstancesByWidgetId(widgetId)" :key="instanceId">
    {{ instance }}
    <button @click="lockInstance(instanceId)">lock</button>
    <button @click="startInstance(instanceId)">start</button>
  </div>
</div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  props: {
    widgetId: String
  },
  computed: {
    ...mapState(['Widgets']),
  },
  methods: {
    ...mapActions({
      'toggleLocked': 'Widgets/toggleLocked',
    }),
    getInstancesByWidgetId(widgetId){
      console.log(widgetId, this.Widgets)
      return Object.keys(this.Widgets.instances).filter((instanceId) => 
      this.Widgets.instances[instanceId].widgetId === widgetId)
    },
    lockInstance: function(widgetId) {
      this.toggleLocked({
        target: widgetId
      });
    },
    startInstance: function(widgetId) {

    },
  }

}
</script>
