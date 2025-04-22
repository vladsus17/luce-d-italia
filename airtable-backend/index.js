require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

    const products = response.data.records.map((record) => ({
      id: record.id,
      sku: record.fields['SKU'],
      description: record.fields['Description'],
      size: record.fields['Size'],
      color: record.fields['Color'],
      quantity: record.fields['Quantity'],
      image: record.fields['Item Photo']?.[0]?.thumbnails?.large?.url || '',
    }));
    res.json(products);
  } catch (error) {
    console.error('❌ Error al obtener datos de Airtable:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error al obtener datos de Airtable',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor API corriendo en http://localhost:${PORT}/api/products`);
});
