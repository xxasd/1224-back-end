import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572526174159_7081';

  // add your egg config in here
  config.middleware = ['jwt'];

  // add RESTful API base path
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

  // 配置跨域
  config.security= {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://127.0.0.1:7000']
  }

  // 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // token凭证
  config.jwtSecret = 'sam';

  // authorization's white list
  config.authWhiteList = ['/api/v1/login/login', '/api/v1/login/register'];

  // cookie name config
  config.auth_cookie_name = 'token';

  // config passport 
  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };

  // router plus add namespace feature
  config.routerPlus = {
    enable: true,
    package: 'egg-router-plus',
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // add view config
  const view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    view
  };
};
