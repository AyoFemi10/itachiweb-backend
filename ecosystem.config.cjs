module.exports = {
  apps: [
    {
      name: 'itachi-md',
      script: 'index.js',
      cwd: '/home/admin/itachiweb-backend',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      restart_delay: 5000,
      max_restarts: 15,
      autorestart: true,
      watch: false,
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
