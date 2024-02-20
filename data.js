const { Pool } = require('pg');
const express = require('express');
const { exec } = require('child_process');

const app = express();
// const pool = new Pool({
//   user: 'postgres',
//   host: '34.130.15.240',
//   database: 'newtestdb',
//   password: 'Makeitbetter@1',
//   port: 5432,
// });

POSTGRES_URL="postgres://default:EkF2xdqZaY6f@ep-divine-meadow-a1ukjzx0-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"

const pool = new Pool({
  connectionString: POSTGRES_URL ,
}
)

app.get('/api/election_data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Election_2024');
    const rows = result.rows;
    await client.release();
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error retrieving data');
  }
});

const PORT = process.env.PORT || 3000;
const API_PATH = '/api/election_data';

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
  // Open Chrome with the specified URL after the server starts
  import('open').then(module => {
    const open = module.default;
    open(`http://localhost:${PORT}${API_PATH}`);
  }).catch(error => {
    console.error('Error opening Chrome:', error);
  });
});
try {
  // ... existing code ...

} catch (error) {
  console.error('Error in /api/election_data:', error);
  res.status(500).send('Internal Server Error');
}