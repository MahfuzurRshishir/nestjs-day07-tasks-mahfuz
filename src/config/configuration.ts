export default () => ({
  productionBuild: process.env.PRODUCTION_BUILD,
  prefix: process.env.PREFIX ?? null,
  hostname: `http://localhost:${process.env.PORT || 3000}`,
  port: parseInt(process.env.PORT!, 10) || 3000,
  mongoCluster: `mongodb://localhost:27017/${process.env.DB_NAME}`,
});