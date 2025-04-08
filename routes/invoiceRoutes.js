const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.post('/:id/cancel', invoiceController.cancelInvoice);
router.get('/:id/cancellation-status', invoiceController.getInvoiceCancellationStatus);
router.post('/special', invoiceController.createSpecialInvoice);

router.get('/:id/pdf', (req, res) =>
  invoiceController.downloadInvoiceFile({ ...req, params: { ...req.params, format: 'pdf' } }, res)
);
router.get('/:id/xml', (req, res) =>
  invoiceController.downloadInvoiceFile({ ...req, params: { ...req.params, format: 'xml' } }, res)
);
router.get('/:id/html', (req, res) =>
  invoiceController.downloadInvoiceFile({ ...req, params: { ...req.params, format: 'html' } }, res)
);

module.exports = router;