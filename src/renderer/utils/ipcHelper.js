const { ipcRenderer } = require('electron');

export default {
  openWidget: ({ instanceId, options, uri }) => {
    ipcRenderer.send('open_widget_window', {
      instanceId,
      options,
      uri  
    });
  },
  disableWidget: ({ instanceId }) => {
    ipcRenderer.send('close_widget_window', {
      instanceId,
    });
  },
  setWidgetLocked: ({ instanceId, isLocked }) => {
    ipcRenderer.send('set_widget_locked', ({ instanceId, isLocked }));
  },
}
