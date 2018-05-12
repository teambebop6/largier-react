module.exports = {
  apps: [
    {
      name: "largier_dev",
      script: "./index.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      cwd: '/usr/local/share/website/largier/dev.chantallargier.com/largier_dev'
    }
  ],
};
