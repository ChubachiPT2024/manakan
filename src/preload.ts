// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('db', {
    loadTodoList: () => ipcRenderer.invoke('loadTodoList'),
    storeTodoList: (todoList: Array<object>) =>
        ipcRenderer.invoke('storeTodoList', todoList),
});