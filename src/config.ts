export default () => ({
  siriwebapi: {
    username: process.env.siriwebapi_username || '',
    password: process.env.siriwebapi_password || '',
  },
  database: {
    host: process.env.database_host || '',
    name: process.env.database_name || '',
    username: process.env.database_username || '',
    password: process.env.database_password || '',
  },
  b2c: {
    clientId: process.env.b2c_client_id || '',
    tenantId: process.env.b2c_tenant_id || '',
    secret: process.env.b2c_client_secret || '',
  },
  jwt: {
    secret: process.env.jwt_secret || '',
    exp: process.env.jwt_exp || '1d',
  },
});
