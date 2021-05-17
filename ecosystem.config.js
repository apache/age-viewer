module.exports = {
  apps: [{
    name: "ag-viewer",
    namespace: "ag-viewer",
    script: "cd backend && node ./build/bin/www",
    watch: false,
    env: {
      name: "ag-viewer-develop",
      PORT: 3001,
      NODE_ENV: "develop",
    },
    env_release: {
      name: "ag-viewer-release",
      PORT: 4000,
      NODE_ENV: "release",
    }
  }],
  deploy: {
    staging: {
      'post-deploy': 'npm install && npm run setup && npm run build-front && pm2 reload ecosystem.config.js'
    }
  }
}
