'use strict';

const unless = () => (path, middleware) => {
  return (req, res, next) => {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

module.exports = unless;

