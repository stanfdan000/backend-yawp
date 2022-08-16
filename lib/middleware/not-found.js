module.exports = (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};
