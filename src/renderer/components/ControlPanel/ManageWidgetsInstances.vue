<template>
<div>
  <div v-for="(instance, instanceId) in getInstancesByWidgetId(widgetId)" :key="instanceId">
    {{ instance }} {{ instanceId }}
    <button 
    @click="toggleLockedHandler(instanceId)">
    {{ (instance.locked) ? 'Unlock' : 'lock' }}
    </button>
    <button 
    @click="toggleEnabledHandler(instanceId)">
    {{ (instance.enabled) ? 'Disable' : 'Enable' }}
    </button>
  </div>
</div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

export default {
  props: {
    widgetId: String
  },
  computed: {
    ...mapState(['Widgets']),
    ...mapGetters('Widgets', ['getInstancesByWidgetId']),
  },
  created: function(){

  },
  methods: {
    ...mapActions({
      'toggleEnabled': 'Widgets/toggleEnabled',
      'toggleLocked': 'Widgets/toggleLocked',
    }),
    toggleLockedHandler: function(instanceId) {
      this.toggleLocked({
        instanceId 
      });
    },
    toggleEnabledHandler: function(instanceId) {
      this.toggleEnabled({
        instanceId
      });
    },
  }

}
</script>
