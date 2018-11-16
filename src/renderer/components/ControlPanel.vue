<template>
  <div>
    <manage-widgets></manage-widgets>
  </div>
</template>

<script>
import ManageWidgets from './ControlPanel/ManageWidgets';
import { mapMutations, mapState, mapActions } from 'vuex'
const ipcHelper = require('@/utils/ipcHelper').default;

export default {
  name: "ControlPanel",
  components: {
    ManageWidgets
  },
  created: function(){
    Object.keys(this.Widgets.instances).map((instanceId) => {
      const { options, uri, enabled } = this.Widgets.instances[instanceId];
      if(enabled === true){
        ipcHelper.openWidget({ instanceId, options, uri });
      }
    })
  },
  computed: {
    ...mapState(['Widgets']),
  },
}
</script>

