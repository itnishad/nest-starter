export default () => ({
  PORT: parseInt(process.env.PORT, 10),
  DATABASE_URL: process.env.DATABASE_URL,
});
