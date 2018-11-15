const { ipcRenderer } = require('electron');
const ipcHelper = require('../../utils/ipcHelper').default;

import _ from 'lodash';

const state = {
  instances: {},
  refs: {},
}

const getters = {
  getInstancesByWidgetId: (state) => (widgetId) => {
    const result = 
    Object
    .keys(state.instances)
    .filter((instanceId) => state.instances[instanceId].widgetId === widgetId)
    .reduce((obj, key) => { 
      obj[key] = state.instances[key] 
      return obj;
    }, {})
    return result;
  },
}

const mutations = {
  createInstance(state, { instanceId, widgetId, options, uri }){
    state.instances = {
      ...state.instances,
      [instanceId]: {
        widgetId,
        options,
        locked: false,
        enabled: true,
        uri
      }
    }
  },

  updatePosition(state, payload) {
    state.instances[payload.instanceId].options.position = payload.position
  },

  toggleLocked(state, payload){
    state.instances[payload.instanceId].locked = !state.instances[payload.instanceId].locked; 
  },

  toggleEnabled(state, payload){
    console.log('mutation', state, payload)
    state.instances[payload.instanceId].enabled = !state.instances[payload.instanceId].enabled; 
  }
}



const actions = {

  createWidget({ commit, state, dispatch }, { instanceId, widgetId, options, uri }) {
    commit('createInstance', {
      instanceId,
      widgetId,
      options,
      uri
    });

    ipcHelper.openWidget({
      instanceId,
      options,
      uri,
    });
  },

  toggleLocked({ commit, state }, { instanceId }) {
    commit('toggleLocked', { instanceId });
    const isLocked = state.instances[instanceId].locked;
    ipcHelper.setWidgetLocked({ instanceId, isLocked });
  },

  toggleEnabled({ commit, state, dispatch }, { instanceId }){
    const { options, uri, enabled } = state.instances[instanceId];
    try{
      commit('toggleEnabled', { instanceId });
      if(enabled){
        ipcHelper.disableWidget({ instanceId });
      }else {
        ipcHelper.openWidget({
          instanceId,
          options,
          uri,
        });
        }
    }catch(err){
      console.log(err);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
