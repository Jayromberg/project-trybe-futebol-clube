module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/app.ts',
    'src/server.ts',
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders'
  ],
  include: ['src/**/*.ts']
};
