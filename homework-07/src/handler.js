const url = require('url');
const querystring = require('querystring');
const router = require('./router');

module.exports = async (req, resp) => {
  try {
    const { url: uri } = req;
    const parsedUrl = url.parse(uri);
    const params = querystring.decode(parsedUrl.query);
    let body = [];

    req
      .on('error', (error) => {
        console.error(error);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();

        router({ ...req, body: body ? JSON.parse(body) : {}, url: parsedUrl, params }, resp);
      });
  } catch (error) {
    console.error(error);
  }
};
