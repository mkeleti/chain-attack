module.exports = {
  apps : [{
    name: 'Transactions',
    watch: false,
    script: './src/Simulate.ts',
    interpreter: '/node_modules/.bin/ts-node-esm'
  }],
  env: {
    NODE_ENV: "development",
  },
  env_production: {
    NODE_ENV: "production",
  }
};
