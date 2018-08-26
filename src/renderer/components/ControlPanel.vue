<template>
  <div>
    <button @click="createWidgetHandler('weather')">click</button>
    <button @click="lockWidgetHandler('weather')">lock</button>
  </div>
</template>

<script>
const { app, BrowserWindow } = require('electron');

import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: "ControlPanel",
  computed: {
      ...mapState(['Widgets'])
  },
  methods: {
    ...mapActions({
      'createWidget': 'Widgets/createWidget',
      'toggleLocked': 'Widgets/toggleLocked',
    }),
    createWidgetHandler: function(name) {
      const { BrowserWindow } = this.$electron.remote;
      const path = this.$router.resolve({ name: name })
      const process = new BrowserWindow({
        frame: false,
        transparent: true,
        useContentSize: true,
        fullscreenable: true,
      })
      this.createWidget({
        target: name,
        ref: process,
        uri: window.location.origin + path.href
      })
    },
    lockWidgetHandler: function(name) {
      this.toggleLocked({
        target: name
      });
    }
  }
}
</script>

