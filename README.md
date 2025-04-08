# Facturapi Backend – Versión 2

Backend completo en Node.js para facturación electrónica con Facturapi. Soporta creación de clientes, productos, facturas de ingreso, egreso, nómina (draft), cancelaciones, descarga de comprobantes y emisión de complementos de pago.

## ✅ Funcionalidades

- Gestión de clientes y productos
- Emisión de facturas (Ingreso, Egreso, Nómina draft)
- Cancelación con motivo SAT
- Descarga de PDF, XML, HTML
- Consulta de estatus de cancelación
- Emisión de Complemento de Pago

---

## 🚀 Instalación

```bash
git clone https://github.com/TU_USUARIO/facturapi-backend.git
cd facturapi-backend
npm install
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```
FACTURAPI_KEY=sk_test_tu_clave
PORT=3000
```

> Puedes obtener tu clave en https://dashboard.facturapi.io/apikeys

---

## ▶️ Ejecutar en desarrollo

```bash
npm start
```

El servidor estará corriendo en:  
`http://localhost:3000`

---

## 📦 Endpoints disponibles

### Clientes
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

### Productos
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Facturas
- `POST /api/invoices`
- `POST /api/invoices/special`
- `POST /api/invoices/:id/cancel`
- `GET /api/invoices/:id/pdf`
- `GET /api/invoices/:id/xml`
- `GET /api/invoices/:id/html`
- `GET /api/invoices/:id/cancellation-status`

### Complemento de pago
- `POST /api/invoices/complement`

---

## ☁️ Despliegue en Producción

### Opción 1: Deploy manual en VPS

```bash
# Crear build (si aplica)
npm install --production

# Ejecutar app en segundo plano
node app.js
```

**Sugerencias para producción:**
- Usar PM2 para mantener el proceso activo
- Configurar NGINX como proxy reverso
- Habilitar HTTPS

### Opción 2: Deploy en Render

1. Crear un nuevo servicio web en https://render.com
2. Seleccionar repositorio GitHub
3. Variables de entorno:
   - `FACTURAPI_KEY`
   - `PORT`
4. Comando de inicio:
   ```
   npm start
   ```

---

## 🧪 Ejemplo de creación de cliente

```json
{
  "legal_name": "JUAN PÉREZ",
  "tax_id": "XAXX010101000",
  "email": "juan@example.com",
  "address": {
    "street": "Calle Falsa",
    "city": "Pachuca",
    "state": "HGO",
    "zip": "42000",
    "country": "MEX"
  }
}
```

---

## 📄 Licencia

MIT
>>>>>>> c30e372 (Versión 2 inicial del backend de Facturapi)
