<template>
<div class="widget">
  <component :is="widget"></component>
</div>
</template>

<script>
import { templates } from '@/widgets/';
console.log(templates)
export default {
  name: 'widget-container',
  props: ['widget'],
  components:{
    ...templates
  },
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