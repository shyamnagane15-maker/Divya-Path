const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Using Postgres Pool, NOT Mongoose

exports.registerDevotee = async (req, res) => {
  try {
    const { fullName, phone, email, password, emergencyContacts } = req.body;

    // 1. Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert into PostgreSQL
    const insertQuery = `
      INSERT INTO users (role, full_name, phone, email, password, emergency_contacts)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email;
    `;
    
    const values = [
      'devotee', 
      fullName, 
      phone, 
      email, 
      hashedPassword, 
      JSON.stringify(emergencyContacts)
    ];

    const newUser = await pool.query(insertQuery, values);

    // 4. Send success response back to React
    res.status(201).json({
      status: "success",
      message: "Account created — you're ready for darshan.",
      data: { userId: newUser.rows[0].id, email: newUser.rows[0].email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user in Postgres
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // 2. Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Send success response back to React
    res.status(200).json({
      status: "success",
      data: { 
        userId: user.id, 
        role: user.role, 
        name: user.full_name 
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};