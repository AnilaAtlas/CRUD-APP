import joi from "joi";

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  Password: joi.string().required()
});

export default schema;
