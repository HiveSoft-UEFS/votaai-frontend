const { exec } = require('child_process');
const path = require('path');

let serverProcess;

function startServer() {
  return new Promise((resolve, reject) => {
    serverProcess = exec('npm run start:mock', {
      cwd: path.resolve(__dirname, '..'),
    });

    serverProcess.stdout.on('data', (data) => {
      if (data.includes('JSON Server is running')) {
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      reject(new Error(data));
    });
  });
}

function stopServer() {
  return new Promise((resolve) => {
    if (serverProcess) {
      serverProcess.kill('SIGINT');
      resolve();
    } else {
      resolve();
    }
  });
}

module.exports = { startServer, stopServer };
