const express = require('express');
const router = express.Router();
const api = require('../services/facturapi');
const { createProductSchema, updateProductSchema } = require('../validators/productValidator');

router.post('/', (req, res) => {
  const { error, value } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      ok: false,
      message: error.details[0].message,
      path: error.details[0].path.join('.')
    });
  }

  api.post('/products', value)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json(error.response?.data || { error: 'Error inesperado' }));
});

router.get('/', (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;
  const params = {
    page,
    limit,
    ...(query && { query })
  };

  api.get('/products', { params })
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json(error.response?.data || { error: 'Error inesperado' }));
});

router.put('/:id', (req, res) => {
  const { error, value } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      ok: false,
      message: error.details[0].message,
      path: error.details[0].path.join('.')
    });
  }

  const { id } = req.params;
  api.put(`/products/${id}`, value)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json(error.response?.data || { error: 'Error inesperado' }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  api.delete(`/products/${id}`)
    .then(response => res.json({ message: 'Producto eliminado', data: response.data }))
    .catch(error => res.status(500).json(error.response?.data || { error: 'Error inesperado' }));
});

module.exports = router;