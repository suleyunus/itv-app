// eslint-disable-next-line consistent-return
const validator = (schema, property) => async (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });
  if (error) {
    return res.status(400).send({
      status: 'Error',
      message: error.details.map((i) => i.message).join(','),
    });
  }
  next();
};

module.exports = validator;
