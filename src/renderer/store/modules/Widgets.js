import _ from 'lodash';
const { BrowserWindow } = require('electron').remote;

const state = {
  instances: {},
  refs: {},
}

const mutations = {
  createInstance(state, { instanceId, widgetId, options, locked, uri }){
    state.instances = {
      ...state.instances,
      [instanceId]: {
        widgetId,
        options,
        locked,
        uri
      }
    }
  },

  createRef(state, { instanceId, ref }){
    state.refs = {
      ...state.refs,
      instanceId: ref 
    }
  },

  toggleLocked(state, payload){
    state.instances[payload.id].locked = !state.instances[payload.id].locked; 
  },

  updatePosition(state, payload) {
    state.instances[payload.id].options.position = payload.position
  },

}

const actions = {
  createWidget({ commit, state }, payload) {
    commit('createInstance', payload);

    const ref = new BrowserWindow({
      ...payload.options,
      frame: false,
      transparent: true,
      useContentSize: true,
      fullscreenable: false,
      backgroundColor: '#00000000' // white background after close dev tool fix
    })
    ref.loadURL(payload.uri)
    commit('createRef', {
      id: payload.id,
      ref
    });

    const updatePosition = _.debounce(() => {
      const position = ref.getPosition();
      commit('updatePosition', {
        id: payload.id,
        position
      })
    }, 300)
    ref.on('move', function(event) {
      console.log('move');
      updatePosition();
    })
  },

  toggleLocked({ commit, state }, payload) {
    commit('toggleLocked', payload);

    const { instances, refs } = state;
    const option = instances[payload.id];
    const ref = refs[payload.id];

    ref.setMovable(!option.locked);
    ref.setResizable(!option.locked);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
