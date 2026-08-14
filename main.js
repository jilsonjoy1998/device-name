// const { app, BrowserWindow } = require("electron");
// const express = require("express");
// const cors = require("cors");
// const os = require("os");
// const { machineIdSync } = require("node-machine-id");

// const api = express();
// api.use(cors());

// api.get("/device", (req, res) => {
//   res.json({
//     userName: os.userInfo().username,
//     deviceName: os.hostname(),
//     machineId: machineIdSync(),
//   });
// });

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 300,
//     height: 150,
//     show: false
//   });

//   api.listen(4567, () => {
//     console.log("Device Helper Running");
//   });
// }

// app.whenReady().then(createWindow);

const { app, BrowserWindow } = require("electron");
const express = require("express");
const cors = require("cors");
const os = require("os");
const { machineIdSync } = require("node-machine-id");
const PORT = 51827;

const api = express();
api.use(cors());

// Device API
api.get("/device", (req, res) => {
  res.json({
    userName: os.userInfo().username,
    deviceName: os.hostname(),
    machineId: machineIdSync(),
  });
});

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 150,
    show: false,          // Hide window
    skipTaskbar: true,    // Don't show in taskbar
  });

  // Start local API
const PORT = 51827;

api.listen(PORT, "127.0.0.1", () => {
  console.log(`Device Helper running on http://127.0.0.1:${PORT}/device`);
});
}

app.whenReady().then(() => {
  // Start automatically when Windows starts
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath("exe"),
  });

  createWindow();
});

// Prevent app from closing when all windows are closed
app.on("window-all-closed", (e) => {
  e.preventDefault();
});