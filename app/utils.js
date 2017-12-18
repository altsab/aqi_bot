const request = require('request');

const stringify = json => JSON.stringify(json, null, 4);

const req = () => new Promise((resolve, reject) => {
  request.get('https://airkaz.org/astana.php', (err, response, body) => {
    if (err) {
      console.log(err);
      reject(err);
    }
    return resolve(body);
  });
});

const getAllData = async () => {
  const body = await req()
    .catch((err) => {
      console.log(err);
      return err;
    });
  const regExp = /sensors_data = ([\s\S]*?)<\/script>/;
  return JSON.parse(body.match(regExp)[1]);
};

const getAstData = async () => {
  const body = await req()
    .catch((err) => {
      console.log(err);
      return err;
    });
  const regExp = /sensors_data = ([\s\S]*?)<\/script>/;
  const json = JSON.parse(body.match(regExp)[1]);
  const astData = json.filter(obj => obj.city === 'Астана');
  return astData.map(obj => ({
    name: obj.name,
    pm10: obj.pm10,
    pm25: obj.pm25,
    date: obj.date,
  }));
};

const getAlmData = async () => {
  const body = await req()
    .catch((err) => {
      console.log(err);
      return err;
    });
  const regExp = /sensors_data = ([\s\S]*?)<\/script>/;
  const json = JSON.parse(body.match(regExp)[1]);
  const astData = json.filter(obj => obj.city === 'Алматы');
  return astData.map(obj => ({
    name: obj.name,
    pm10: obj.pm10,
    pm25: obj.pm25,
    date: obj.date,
  }));
};

const getKrgData = async () => {
  const body = await req()
    .catch((err) => {
      console.log(err);
      return err;
    });
  const regExp = /sensors_data = ([\s\S]*?)<\/script>/;
  const json = JSON.parse(body.match(regExp)[1]);
  const astData = json.filter(obj => obj.city === 'Караганда');
  return astData.map(obj => ({
    name: obj.name,
    pm10: obj.pm10,
    pm25: obj.pm25,
    date: obj.date,
  }));
};

const getTmrtData = async () => {
  const body = await req()
    .catch((err) => {
      console.log(err);
      return err;
    });
  const regExp = /sensors_data = ([\s\S]*?)<\/script>/;
  const json = JSON.parse(body.match(regExp)[1]);
  const astData = json.filter(obj => obj.city === 'Темиртау');
  return astData.map(obj => ({
    name: obj.name,
    pm10: obj.pm10,
    pm25: obj.pm25,
    date: obj.date,
  }));
};

const beautifyData = json => json.reduce((acc, obj) => {
  const {
    name, pm10, pm25, date,
  } = obj;
  const markdownString =
  `
*Район*: ${name}
*pm10*: ${pm10 === '-1' ? 'Данные недоступны' : pm10}
*pm2.5*: ${pm25 === '-1' ? 'Данные недоступны' : pm25}
*Дата проверки*: ${date}
  `;
  return acc + markdownString;
}, '');

module.exports = {
  stringify,
  beautifyData,
  getAllData,
  getAstData,
  getAlmData,
  getKrgData,
  getTmrtData,
};
