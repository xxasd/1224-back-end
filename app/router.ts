import { Application, Router } from "egg";

export default (app: Application) => {
  const { controller } = app;

  const { login, test, article } = controller;

  const apiV1Router: Router = app.router.namespace("/api/v1");

  console.log(login.register);
  apiV1Router.get("/", controller.home.index);

  /**
   * 用户login
   * 注册/登录/推出登录
   */
  // 注册
  apiV1Router.post("/login/register", login.register);
  // 登录
  apiV1Router.post("/login/login", login.loginIn);

  /**
   * 文章article
   * 新增/编辑/删除
   */
  // 新增
  apiV1Router.post("/article/create", article.articleCreat);
  // 列表
  apiV1Router.get("/article/list", article.articleList);

  // 测试post请求
  apiV1Router.post("/test/posting", test.posting);
};
