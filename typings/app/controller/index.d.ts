// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportLogin from '../../../app/controller/login';
import ExportTest from '../../../app/controller/test';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    login: ExportLogin;
    test: ExportTest;
  }
}
