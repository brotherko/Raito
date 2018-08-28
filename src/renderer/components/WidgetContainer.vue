<template>
<div class="widget">
  <component :is="widget"></component>
</div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import { templates } from '@/widgets/';
export default {
  name: 'widget-container',
  created: function(){
  },
  components:{
    ...templates
  },
  computed: {
    ...mapState(['Widgets']),
    widget: function(){
      const instanceId = this.$route.params.instanceId;
      return this.Widgets.instances[instanceId].widgetId ;
    }
  }
}
</script>

<style>
.widget {
  font-family: Arial;
  background: rgba(33, 33, 33, 0.7);
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
</style>