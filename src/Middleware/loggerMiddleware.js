const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toDateString();

  console.log(`[LOG] ${timestamp} | ${req.method} ${req.url}`);
  next();
};

module.export = loggerMiddleware;
