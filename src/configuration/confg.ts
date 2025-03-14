export default () => ({
  PORT: parseInt(process.env.PORT, 10),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_AUTH_SECRECT: process.env.JWT_AUTH_SECRECT,
  REFRESH_JWT_SECRECT: process.env.REFRESH_JWT_SECRECT,
});
