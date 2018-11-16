<template>
<div class="widget">
  <component :is="getWidgetIdByInstanceId($route.params.instanceId)"></component>
</div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapGetters('Widgets', ['getWidgetIdByInstanceId']),
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