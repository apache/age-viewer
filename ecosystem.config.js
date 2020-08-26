module.exports = {
    apps : [{
      name: "openbrowser",
      namespace: "openbrowser",
      script: "./backend/server/bin/www",
      watch: false,
      env: {
        name: "openbrowser-develop",
        PORT: 3001,
        NODE_ENV: "develop",
      },
      env_release: {
        name: "openbrowser-release",
        PORT: 4000,
        NODE_ENV: "release",
      }
    }]
  }