const Joi = require('joi');

const createProductSchema = Joi.object({
  description: Joi.string().required(),
  product_key: Joi.string().required(),
  price: Joi.number().required(),
  tax_included: Joi.boolean().required(),
  sku: Joi.string().optional(),
  local_code: Joi.string().optional(),
  unit_key: Joi.string().optional(),
  unit_name: Joi.string().optional()
});

const updateProductSchema = Joi.object({
  description: Joi.string().optional(),
  product_key: Joi.string().optional(),
  price: Joi.number().optional(),
  tax_included: Joi.boolean().optional(),
  sku: Joi.string().optional(),
  local_code: Joi.string().optional(),
  unit_key: Joi.string().optional(),
  unit_name: Joi.string().optional()
});

module.exports.createProductSchema = createProductSchema;
module.exports.updateProductSchema = updateProductSchema;