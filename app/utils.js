const request = require('request');

const stringify = json => JSON.stringify(json, null, 4);
const regExp = /sensors_data = ([\s\S]*?)<\/script>/;

const getData = () => new Promise((resolve, reject) => {
  request.get('https://airkaz.org/astana.php', (err, response, body) => {
    if (err) {
      console.log(err);
      reject(err);
    }
    const json = JSON.parse(body.match(regExp)[1]);
    return resolve(json)
  });
});

const getCityData = async (requestedCity) => {
  const json = await getData()
    .catch((err) => {
      console.log(err);
      return err;
    });
  const data = json.filter(obj => obj.city === requestedCity && obj.status === "active" && obj.pm10 > -1 && obj.pm25 > -1);
  const filteredData =  data.map(obj => ({
    name: obj.name,
    pm10: obj.pm10,
    pm25: obj.pm25,
    date: obj.date,
  }));
  console.log(filteredData);
  return filteredData
};

const beautifyData = json => json.reduce((acc, obj) => {
  const {
    name, pm10, pm25, date,
  } = obj;
  const markdownString =
  `
*Район*: ${name}
*pm10*: ${pm10}
*pm2.5*: ${pm25}
*Дата проверки*: ${date}
  `;
  return acc + markdownString;
}, '');

module.exports = {
  stringify,
  beautifyData,
  getCityData,
  getData,
};
