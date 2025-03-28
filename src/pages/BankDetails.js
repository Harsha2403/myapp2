import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Divider, Alert, CircularProgress, MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BankDetails = () => {
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState([]);
  const [newBank, setNewBank] = useState({ accountnumber: "", accounttype: "", bankname: "", branch: "", ifsc: "", swift: "" });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Bank Details
  const fetchBankDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/bankdetails/bankdetails");
      const data = await response.json();
      if (response.ok) {
        setBankDetails(data);
      } else {
        setError(data.message || "Failed to fetch bank details");
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setError("Server error while fetching bank details.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  // Handle Submit
  const handleSubmit = async () => {
    setError("");
    if (!newBank.accountnumber || !newBank.accounttype || !newBank.bankname || !newBank.branch || !newBank.ifsc || !newBank.swift) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/bankdetails/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBank),
      });
      const result = await response.json();
      if (response.ok) {
        fetchBankDetails();
        setNewBank({ accountnumber: "", accounttype: "", bankname: "", branch: "", ifsc: "", swift: "" });
        setShowForm(false);
      } else {
        setError(result.message || "Error adding bank details");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Bank Details</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add"}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto", borderRadius: 2 }}>
            <Table stickyHeader>
              <TableHead sx={{ bgcolor: "#e0e0e0" }}>
                <TableRow>
                  <TableCell><b>Account Number</b></TableCell>
                  <TableCell><b>Account Type</b></TableCell>
                  <TableCell><b>Bank Name</b></TableCell>
                  <TableCell><b>Branch</b></TableCell>
                  <TableCell><b>IFSC</b></TableCell>
                  <TableCell><b>SWIFT</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bankDetails.map((bank, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{bank.accountnumber}</TableCell>
                    <TableCell>{bank.accounttype}</TableCell>
                    <TableCell>{bank.bankname}</TableCell>
                    <TableCell>{bank.branch}</TableCell>
                    <TableCell>{bank.ifsc}</TableCell>
                    <TableCell>{bank.swift}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Add Bank Details</Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField label="Account Number" fullWidth value={newBank.accountnumber} onChange={(e) => setNewBank({ ...newBank, accountnumber: e.target.value })} />
            <TextField label="Account Type" fullWidth select value={newBank.accounttype} onChange={(e) => setNewBank({ ...newBank, accounttype: e.target.value })}>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Current">Current</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField label="Bank Name" fullWidth value={newBank.bankname} onChange={(e) => setNewBank({ ...newBank, bankname: e.target.value })} />
            <TextField label="Branch" fullWidth value={newBank.branch} onChange={(e) => setNewBank({ ...newBank, branch: e.target.value })} />
            <TextField label="IFSC Code" fullWidth value={newBank.ifsc} onChange={(e) => setNewBank({ ...newBank, ifsc: e.target.value })} />
            <TextField label="SWIFT Code" fullWidth value={newBank.swift} onChange={(e) => setNewBank({ ...newBank, swift: e.target.value })} />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" color="secondary" onClick={() => setNewBank({ accountnumber: "", accounttype: "", bankname: "", branch: "", ifsc: "", swift: "" })}>Reset</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default BankDetails;
