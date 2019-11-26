import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    password: 'newrootpassword',
    database: '1224',
    timezone: '+08:00',
  }
  
  return config;
};
