const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { redisClient } = require('../services/redis.service');

const { authService, userService, emailService } = require('../services');

const viewPage = catchAsync(async (req, res) => {
  const user = req.user;
  const redisObj = JSON.stringify({
    name: user.name,
    avatar: user.avatar
  })
  redisClient.SETEX(`user-active-${user.id}`, 60, redisObj);
  redisClient.keys('user-active-*', (err, keys) => {
    if (err) throw 'redis-error command:keys';
    redisClient.mget(...keys, (err, values) => {
      if (err) throw 'redis-error command:mget';
      const responseData = [];
      if (Array.isArray(values)) {
        values.forEach(value => {
          responseData.push(JSON.parse(value));
        })
      }
      else responseData.push(JSON.parse(values));
      return res.status(httpStatus.OK).send(responseData);
    })
  });
});

module.exports = {
  viewPage
};
