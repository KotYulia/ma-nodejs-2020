const cliSelect = require('cli-select');

const controller = require('./controller');

cliSelect({
  values: ['Axios', 'Request promise native', 'HTTP client'],
  valueRenderer: (value) => {
    return value;
  },
})
  .then((response) => {
    controller.clientService(response.value);
  })
  .catch(() => {
    console.log('cancelled');
  });
