module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: "job-share",
      script: "./bin/www",
      env: {
        DB_NAME: "jobshare_test",
      },
      env_production: {
        NODE_ENV: "production",
        DB_HOST: "13.251.27.111",
        DB_USER: "sydv",
        DB_PASSWORD: "123456a@",
        PORT: 8888,
        DEBUG: "job-share:error,app:error",
      },
      env_development: {
        NODE_ENV: "development",
        DB_HOST: "localhost",
        DB_USER: "sydv",
        DB_PASSWORD: "123456a@",
        PORT: 8585,
        DEBUG: "job-share:*,app:*",
      },
    },
  ],
};
