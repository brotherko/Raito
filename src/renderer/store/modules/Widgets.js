import _ from 'lodash';

const state = {
  options: {},
  refs: {},
}

const mutations = {
  createWidget(state, payload) {
    const { options, refs } = state;

    const option = (options[payload.target]) ? options[payload.target] :
    {
      position: [0, 0],
      width: 300,
      height: 150,
      locked: false
    }

    options[payload.target] = option;
    refs[payload.target] = payload.ref 
  },
  toggleLocked(state, payload){
    const { options } = state;
    options[payload.target].locked = !options[payload.target].locked; 
  },
  updatePosition(state, payload) {
    const { options, refs } = state;

    options[payload.target].position = payload.position
  },
}

const actions = {
  createWidget({ commit, state }, payload) {
    commit('createWidget', payload);

    const { options, refs } = state;
    const option = options[payload.target];
    const ref = refs[payload.target];

    ref.setPosition(option.position[0], option.position[1]);
    ref.setSize(option.width, option.height);
    ref.loadURL(payload.uri)

    const updatePosition = _.debounce(() => {
      const position = ref.getPosition();
      console.log(position);
      commit('updatePosition', {
        target: payload.target,
        position
      })
    }, 100)
    ref.on('move', function(event) {
      console.log('move');
      updatePosition();
    })

  },
  toggleLocked({ commit, state }, payload) {
    commit('toggleLocked', payload);

    const { options, refs } = state;
    const option = options[payload.target];
    const ref = refs[payload.target];

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
