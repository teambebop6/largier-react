module.exports = {
  apps: [
    {
      name: "largier",
      script: "./index.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      cwd: '/usr/local/share/website/largier/www.chantallargier.com/largier'
    }
  ],
};
