const Joi = require('joi');

const createClientSchema = Joi.object({
  legal_name: Joi.string().required(),
  email: Joi.string().email().required(),
  tax_id: Joi.string().required(),
  phone: Joi.string().optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    neighborhood: Joi.string().optional(),
    zip: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().length(3).optional()
  }).optional(),
});

const updateClientSchema = Joi.object({
  legal_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  tax_id: Joi.string().optional(),
  phone: Joi.string().optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    neighborhood: Joi.string().optional(),
    zip: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().length(3).optional()
  }).optional(),
});

module.exports = {
  createClientSchema,
  updateClientSchema
};