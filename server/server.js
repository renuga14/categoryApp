const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // To hash the password
const sql = require('mssql'); // Import the mssql package

const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
// Middleware to parse JSON request body
app.use(bodyParser.json());

// SQL Server configuration
const sqlConfig = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'DB_Practice',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const jwt = require('jsonwebtoken');
const secretKey = "categoryProject-81888";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Token required" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;
        next();
    });
}

// Sign-up API endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Connect to SQL Server
        await sql.connect(sqlConfig);
        const query = `INSERT INTO signup (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`;
        const result = await sql.query(query);
        res.status(201).json({
            message: 'User signed up successfully',
            rowsAffected: result.rowsAffected,
        });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: 'Server error' });
    } finally {

        sql.close();
    }
});


app.post('/login1', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
    }
    try {
        await sql.connect(sqlConfig);
        const request = new sql.Request();

        request.input('email', sql.VarChar, email);

        const result = await request.query('SELECT * FROM signup WHERE email = @email');

        console.log("User1 found:", result.recordset);

        const user = result.recordset[0];
        console.log("user:", user);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ... password check code
        if (isMatch) {
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        }

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    } finally {
        sql.close();
    }
});

//category
app.get('/categories', authenticateToken, async (req, res) => {
    try {
        await sql.connect(sqlConfig);

        const request = new sql.Request();
        const result = await request.query('SELECT * FROM category');

        res.status(200).json({ message: 'Success', categories: result.recordset });
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Server error' });
    } finally {
        sql.close();
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
