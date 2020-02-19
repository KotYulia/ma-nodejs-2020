const controller = require('./controller');
const authorization = require('./config');

let LIMIT = 300;

module.exports = (req, resp) => {
  const { url, method, params } = req;
  if (req.headers.authorization !== authorization) {
    controller.errorRes(resp, 401, 'Unauthorized');
    return;
  }
  switch (url.pathname) {
    case '/limit':
      if (method === 'POST') {
        if (req.body.limit) {
          LIMIT = req.body.limit;
        }
        if (typeof LIMIT !== 'number') {
          controller.errorRes(
            resp,
            400,
            'New value for minimum free memory limit is not valid number',
          );
        } else {
          controller.successfulRes(resp, {
            message: `Minimum free memory limit is successfully set to ${LIMIT} MB`,
          });
        }
      } else {
        controller.errorRes(resp, 500, 'Internal error occured');
      }
      break;

    case '/metrics':
      if (method === 'GET') {
        if (params.filter) {
          switch (params.filter) {
            case 'total':
              controller.successfulRes(resp, {
                message: 'OK',
                total: `${controller.totalSystemMemory}`,
              });
              break;
            case 'free':
              if (parseFloat(controller.freeSystemMemory()) < parseFloat(LIMIT)) {
                controller.successfulRes(resp, {
                  message: 'Available memory is under the defined limit',
                  free: `${controller.freeSystemMemory()}`,
                });
              } else {
                controller.successfulRes(resp, {
                  message: 'OK',
                  free: `${controller.freeSystemMemory()}`,
                });
              }
              break;
            case 'allocated':
              controller.successfulRes(resp, {
                message: 'OK',
                allocated: `${controller.usedSystemMemory()}`,
              });
              break;
            default:
              controller.errorRes(resp, 400, 'Filter value is not valid');
              break;
          }
        } else {
          controller.successfulRes(resp, {
            message: 'OK',
            total: `${controller.totalSystemMemory}`,
            free: `${controller.freeSystemMemory()}`,
            allocated: `${controller.usedSystemMemory()}`,
          });
        }
      } else {
        controller.errorRes(resp, 500, 'Internal error occured');
      }
      break;
    case '/status':
      controller.randomWithProbability(resp);
      break;
    default:
      controller.errorRes(resp, 404, 'Error 404');
      break;
  }
};
