const api = require('../services/facturapi');
const invoiceController = require('../controllers/invoiceController');

exports.createInvoice = async (req, res) => {
  try {
    const response = await api.post('/invoices', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error al crear factura' });
  }
};

exports.createSpecialInvoice = async (req, res) => {
  const { type, ...invoiceData } = req.body;

  if (!['I', 'E', 'P', 'N', 'T'].includes(type)) {
    return res.status(400).json({ error: 'Tipo de factura no válido. Usa "I", "E", "P", "N" o "T"' });
  }

  try {
    const response = await api.post('/invoices', {
      ...invoiceData,
      type
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error al crear factura especial' });
  }
};

exports.getInvoices = async (req, res) => {
    try {
      const response = await api.get('/invoices');
      res.json(response.data);
    } catch (error) {
      res.status(500).json(error.response?.data || { error: 'Error al obtener facturas' });
    }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const response = await api.get(`/invoices/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error al obtener factura' });
  }
};

exports.cancelInvoice = async (req, res) => {
  const facturaId = req.params.id;
  console.log('🧾 Cancelando factura con ID:', facturaId);
  try {
    const response = await api.delete(`/invoices/${facturaId}?motive=02`);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al cancelar factura:', error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: 'Error al cancelar factura' });
  }
};

exports.downloadInvoiceFile = async (req, res) => {
  try {
    const { id, format } = req.params;
    const response = await api.get(`/invoices/${id}/${format}`, { responseType: 'arraybuffer' });

    const contentType = {
      pdf: 'application/pdf',
      xml: 'application/xml',
      html: 'text/html'
    };

    res.set('Content-Type', contentType[format]);
    res.send(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: 'Error al descargar archivo' });
  }
};

exports.getInvoiceCancellationStatus = async (req, res) => {
  const facturaId = req.params.id;
  try {
    const response = await api.get(`/invoices/${facturaId}`);
    const { status, cancellation_status } = response.data;
    res.json({ status, cancellation_status });
  } catch (error) {
    console.error('❌ Error al consultar estado de cancelación:', error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: 'Error al consultar estado de cancelación' });
  }
};