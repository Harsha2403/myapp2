const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ GET all contracts
router.get("/contract", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contract ORDER BY contractid DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("🔥 Error fetching contracts:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ POST - Add Contract
router.post("/add", async (req, res) => {
    try {
        const { contractid, name, parentid, pariyojana, sector, state, contracttype, contractmodel, startdate, enddate } = req.body;

        if (!contractid || !name || !parentid || !pariyojana || !sector) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if contract ID already exists
        const existingContract = await pool.query("SELECT * FROM contract WHERE contractid = $1", [contractid]);
        if (existingContract.rows.length > 0) {
            return res.status(409).json({ success: false, message: "Contract ID already exists" });
        }

        // Insert contract into database
        const query = `INSERT INTO contract (contractid, name, parentid, pariyojana, sector, state, contracttype, contractmodel, startdate, enddate) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

        const values = [contractid, name, parentid, pariyojana, sector, state, contracttype, contractmodel, startdate, enddate];

        const newContract = await pool.query(query, values);
        res.status(201).json({ success: true, data: newContract.rows[0] });

    } catch (err) {
        console.error("🔥 Server Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
