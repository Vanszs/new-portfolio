module.exports = {
  apps: [
    {
      name: 'portfolio',
      cwd: '/home/ubuntu/code/new-portfolio',
      script: 'npm',
      args: 'start',
      node_args: '-r dotenv/config',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
