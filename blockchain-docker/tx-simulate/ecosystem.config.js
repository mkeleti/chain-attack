module.exports = {
  apps : [{
    name: 'Transactions',
    watch: false,
    script: 'ts-node',
    args: '-r tsconfig-paths/register src/Simulate.ts',
  }],
  env: {
    NODE_ENV: "development",
  },
  env_production: {
    NODE_ENV: "production",
  }
};
