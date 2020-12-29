"use strict";
const {
  debug,
  apiCode,
  IS_ACTIVE,
  ROLE,
  SALE_STATUS,
} = require("../utils/constant");
var compose = require("composable-middleware");
const response = require("../common/response");
const Sequelize = require("sequelize");
const UserService = require("../services/users.service.js");
const Op = Sequelize.Op;
// const userController = require('../controllers/userController')

module.exports = {
  isGuest: function isGuest() {
    return compose().use(function (req, res, next) {
      next();
      return;
    });
  },
  isAuthenticated: function isAuthenticated() {
    return compose().use(async function (req, res, next) {
      if (req.headers && req.headers.token) {
        try {
          req.url = req.protocol + '://' + req.get('host') + '/';

          var findUser = await UserService.getInfo(req.headers);
          if (findUser) {
            req.auth = findUser.dataValues;
            next();
            return;
          } else return res.json(response.error(apiCode.UNAUTHORIZED));
          // req.auth = { company_id: 1 };
          // next();
          // return;
        } catch (error) {
          debug.error(error);
          console.log('error ', error);
          return res.json(response.error(apiCode.DB_ERROR, "Lỗi kết nối"));
        }
      } else {
        return res.json(response.error(apiCode.INVALID_ACCESS_TOKEN));
      }
    });
  },
};
