// eslint-disable-next-line prefer-const
const userName = 'Julia';
const userPass = '654ddf64ff65df4';
const authorization = `Basic ${Buffer.from(`${userName}:${userPass}`).toString('base64')}`;

module.exports = authorization;
