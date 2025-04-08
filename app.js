const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clientRoutes = require('./routes/clientRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});