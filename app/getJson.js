const request = require('request');

request.get('https://airkaz.org/astana.php', (err, response, body) => {
  console.log(body);
});