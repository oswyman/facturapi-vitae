const api = require('../services/facturapi');
const { createProductSchema, updateProductSchema } = require('../validators/productValidator');

const createProduct = async (req, res) => {
  try {
    const { error, value } = createProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        ok: false,
        message: error.details[0].message,
        path: error.details[0].path.join('.')
      });
    }

    const response = await api.post('/products', value);
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error inesperado' });
  }
};

const getProducts = async (req, res) => {
  try {
    const { query, page = 1, limit = 20 } = req.query;
    const params = {
      page,
      limit,
      ...(query && { query })
    };
    const response = await api.get('/products', { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error inesperado' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        ok: false,
        message: error.details[0].message,
        path: error.details[0].path.join('.')
      });
    }

    const { id } = req.params;
    const response = await api.put(`/products/${id}`, value);
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error inesperado' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await api.delete(`/products/${id}`);
    res.json({ message: 'Producto eliminado', data: response.data });
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error inesperado' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};