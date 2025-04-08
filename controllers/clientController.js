// controllers/clientController.js
const api = require('../services/facturapi');
const { updateClientSchema, createClientSchema } = require('../validators/clientValidator');

exports.createClient = async (req, res) => {
    try {
      delete req.body.metadata;
      const { error, value } = createClientSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          ok: false,
          message: error.details[0].message,
          path: error.details[0].path.join('.')
        });
      }
  
      const response = await api.post('/customers', value);
      res.json(response.data);
    } catch (err) {
      res.status(500).json(err.response?.data || { error: 'Error inesperado' });
    }
};

exports.updateClient = async (req, res) => {
  try {
    delete req.body.metadata;
    const { error, value } = updateClientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        ok: false,
        message: error.details[0].message,
        path: error.details[0].path.join('.')
      });
    }

    const { id } = req.params;
    const response = await api.put(`/customers/${id}`, value);
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.response?.data || { error: 'Error inesperado' });
  }
};

exports.getClients = async (req, res) => {
  try {
    const { query, page = 1, limit = 20 } = req.query;
    const params = {
      page,
      limit,
      ...(query && { query })
    };

    const response = await api.get('/customers', { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error inesperado' });
  }
};

exports.deleteClient = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await api.delete(`/customers/${id}`);
      res.json({ message: 'Cliente eliminado', data: response.data });
    } catch (error) {
      res.status(500).json(error.response?.data || { error: 'Error inesperado' });
    }
};

exports.createProduct = async (req, res) => {
  try {
    const response = await api.post('/products', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error inesperado' });
  }
};

exports.getProducts = async (req, res) => {
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