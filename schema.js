const Joi = require("joi");

const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;
  registrationSchema
    .validateAsync({ username, email, password })
    .then(() => next())
    .catch(() => res.redirect("/register"));
};

module.exports = { validateRegistration };
