export default (ipcRenderer) => {
  return store => {
    ipcRenderer.on('update_widget_window_position', (event, { instanceId, position }) => {
      store.commit('Widgets/updatePosition', { instanceId, position })
    })

  }
}