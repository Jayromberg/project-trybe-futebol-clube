import * as Joi from 'joi';

const schemaEmail = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }),
});

const schemaPassword = Joi.object({
  password: Joi.string().min(6),
});

export {
  schemaEmail,
  schemaPassword,
};
