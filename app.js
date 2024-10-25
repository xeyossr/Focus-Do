import { app, BrowserWindow, Menu, globalShortcut } from 'electron'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 690
  });

  mainWindow.loadFile('web/index.html');

  Menu.setApplicationMenu(null)

  globalShortcut.register('Control+R', () => {
    mainWindow.reload()
  })

  globalShortcut.register('Control+Shift+I', () => {
    mainWindow.webContents.toggleDevTools()
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
