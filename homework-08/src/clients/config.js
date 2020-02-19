const userName = 'Julia';
const userPass = '654ddf64ff65df4';
const auth = `Basic ${Buffer.from(`${userName}:${userPass}`).toString('base64')}`;
const MAX_RETRIES = 30;

const endpoints = [
  {
    hostname: 'localhost',
    port: 3000,
    path: '/limit',
    method: 'POST',
    authorization: auth,
    data: { limit: 500 },
    retry: false,
  },
  {
    hostname: 'localhost',
    port: 3000,
    path: '/metrics',
    method: 'GET',
    authorization: auth,
    data: '',
    retry: false,
  },
  {
    hostname: 'localhost',
    port: 3000,
    path: '/metrics?filter=total',
    method: 'GET',
    authorization: auth,
    data: '',
    retry: false,
  },
  {
    hostname: 'localhost',
    port: 3000,
    path: '/metrics?filter=free',
    method: 'GET',
    authorization: auth,
    data: '',
    retry: false,
  },
  {
    hostname: 'localhost',
    port: 3000,
    path: '/metrics?filter=allocated',
    method: 'GET',
    authorization: auth,
    data: '',
    retry: false,
  },
  {
    hostname: 'localhost',
    port: 3000,
    path: '/status',
    method: 'GET',
    authorization: auth,
    data: '',
    retry: true,
  },
];

module.exports = {
  endpoints,
  MAX_RETRIES,
};
