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
  const body = await req();
  const regExp = /sensors_data = ([\s\S]*?)<\/script>/;
  return JSON.parse(body.match(regExp)[1]);
};

const getAstData = async () => {
  const body = await req();
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
  const body = await req();
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
  const body = await req();
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
  const body = await req();
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

module.exports = {
  stringify,
  getAllData,
  getAstData,
  getAlmData,
  getKrgData,
  getTmrtData,
};
