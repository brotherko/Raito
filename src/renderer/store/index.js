import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";

import modules from './modules'
import ipcListener from './ipcListener';

const { ipcRenderer } = require('electron');

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({ paths: ['Widgets.instances'] }),
    ipcListener(ipcRenderer),
  ],
  strict: process.env.NODE_ENV !== 'production'
})
