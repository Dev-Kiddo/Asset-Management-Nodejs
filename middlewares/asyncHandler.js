const asyncHandler = function (controllerFn) {
  return function (req, res, next) {
    Promise.resolve(controllerFn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
