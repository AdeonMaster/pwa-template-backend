import fs from 'fs';

const createLogger = (config = {}) => {
  const dirName = config.dirName || 'logs';

  const fileName = new Date().toISOString().split('T')[0];

  if (!fs.existsSync(`./${dirName}`)) {
    fs.mkdirSync(`./${dirName}`);
  }

  const fileStream = fs.createWriteStream(`./${dirName}/${fileName}.log`, { flags: 'a' });

  return {
    debug: (string) => {
      fileStream.write(`\r\n${Date.now()} ${string}`);
      console.log(string);
    },
  };
};

export default createLogger;
