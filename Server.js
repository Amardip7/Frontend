const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IRRA_DB_MAIN',
  password: '123',
  port: 5432,
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simulate LDAP authentication
  const ldapSuccess = true; // Assumed always true for now

  if (ldapSuccess) {
    try {
      // Query to check if the user exists and has access
      const query = `SELECT * FROM OPS_USER_IRRA WHERE OPS_USER_ID = $1 AND OPS_USER_ACCESS_FLAG = 'Y'`;
      const result = await pool.query(query, [username]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        
        // Compare provided password with stored password
        if (password === 123) {
          // Password matches
          console.log(`Login successful for user: ${username}`); // Log to console
          res.status(200).json({ message: 'Login successful' });
        } else {
          // Password does not match
          console.log(`Login failed for user: ${username} - Incorrect password`); // Log to console
          res.status(401).json({ message: 'Login details incorrect' });
        }
      } else {
        // User does not exist or does not have access
        console.log(`Login failed for user: ${username} - No access flag set to 'Y'`); // Log to console
        res.status(401).json({ message: 'Login details incorrect' });
      }
    } catch (err) {
      console.error('Database query error:', err); // Log to console
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // LDAP authentication failed
    console.log('LDAP authentication failed'); // Log to console
    res.status(401).json({ message: 'LDAP authentication failed' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
