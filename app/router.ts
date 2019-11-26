import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;

  const { login } = controller;

  const apiV1Router: Router = app.router.namespace('/api/v1');

  console.log(login.register);
  apiV1Router.get('/', controller.home.index);

  // 用户
  apiV1Router.post('/login/register', login.register);
};