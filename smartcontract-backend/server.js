require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

// ✅ Initialize Express App BEFORE Using It
const app = express();

// ✅ Import Routes AFTER Initializing `app`
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const legalEntityRoutes = require("./routes/legalEntityRoutes");
const listedRoutes = require("./routes/listedRoutes");
const addressRoutes = require("./routes/addressRoutes");
const contactRoutes = require("./routes/contactRoutes");
const registrationsRoutes = require("./routes/registrationsRoutes");
const bankDetailsRoutes = require("./routes/bankDetailsRoutes");

const contractRoutes = require("./routes/contractRoutes");

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Ensure Required Env Variables
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error("❌ Missing required database environment variables!");
  process.exit(1);
}

// ✅ Check JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in environment variables!");
  process.exit(1);
} else {
  console.log("✅ JWT_SECRET loaded successfully.");
}

// ✅ Database Connection
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "newpassword",
  database: process.env.DB_NAME || "smartcontract",
  port: process.env.DB_PORT || 5432,
});

pool.query("SELECT NOW()")
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/legal-entity", legalEntityRoutes); // ✅ Now app is properly initialized
app.use("/api/listed",listedRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/registration", registrationsRoutes);
app.use("/api/bankdetails", bankDetailsRoutes);

app.use("/api/contract", contractRoutes);


// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
