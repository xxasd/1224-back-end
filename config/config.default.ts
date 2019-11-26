import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572526174159_7081';

  config.middleware = [];

  config.basePath = '/api/v1'

  // 关闭安全威胁csrf的防范
  config.security = {
    csrf: {
      ignore: ctx => {
        let ipReg = /^(172\.17|127\.0)/;
        return ipReg.test(ctx.ip)
      }
    }
  }

  config.security= {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
      domainWhiteList: ['http://localhost:7001','http://127.0.0.1:7001']
  }

  // add your egg config in here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    password: 'newrootpassword',
    database: '1224',
    timezone: '+08:00',
  }

  // router plus add namespace feature
  config.routerPlus = {
    enable: true,
    package: 'egg-router-plus',
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
