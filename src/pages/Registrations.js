import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Divider, Alert, CircularProgress, MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Registrations = () => {
  const navigate = useNavigate();
  const [gstRegistrations, setGstRegistrations] = useState([]);
  const [newRegistration, setNewRegistration] = useState({ gstn: "", state: "" });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const states = ["Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"];

  // Fetch GST Registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/registration/registration");
      const data = await response.json();
      if (response.ok) {
        setGstRegistrations(data);
      } else {
        setError(data.message || "Failed to fetch registrations");
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setError("Server error while fetching registrations.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Handle Submit
  const handleSubmit = async () => {
    setError("");
    if (!newRegistration.gstn || !newRegistration.state) {
      setError("Please provide a valid GSTN and select a state.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/registration/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRegistration),
      });
      const result = await response.json();
      if (response.ok) {
        fetchRegistrations();
        setNewRegistration({ gstn: "", state: "" });
        setShowForm(false);
      } else {
        setError(result.message || "Error adding registration");
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
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>GST Registrations</Typography>
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
                  <TableCell><b>GSTN</b></TableCell>
                  <TableCell><b>State</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gstRegistrations.map((reg, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{reg.gstn}</TableCell>
                    <TableCell>{reg.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Add GST Registration</Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField label="GSTN" fullWidth value={newRegistration.gstn} onChange={(e) => setNewRegistration({ ...newRegistration, gstn: e.target.value })} />
            <TextField label="State / UT" fullWidth select value={newRegistration.state} onChange={(e) => setNewRegistration({ ...newRegistration, state: e.target.value })}>
              {states.map((state, i) => (
                <MenuItem key={i} value={state}>{state}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" color="secondary" onClick={() => setNewRegistration({ gstn: "", state: "" })}>Reset</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Registrations;