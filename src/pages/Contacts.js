import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Divider, Alert, CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", mobile: "" });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/contacts/contacts");
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } else {
        setError(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Server error while fetching contacts.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle Submit
  const handleSubmit = async () => {
    setError("");

    if (!newContact.name || !newContact.email.includes("@") || !newContact.mobile.match(/^\d{10}$/)) {
      setError("Please provide valid name, email, and 10-digit mobile number.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/contacts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      const result = await response.json();

      if (response.ok) {
        fetchContacts();
        setNewContact({ name: "", email: "", mobile: "" });
        setShowForm(false);
      } else {
        setError(result.message || "Error adding contact");
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
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Contacts</Typography>
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
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Mobile</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.mobile}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Add Contact</Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField label="Name" fullWidth value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
            <TextField label="Email" fullWidth value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
            <TextField label="Mobile Number" fullWidth value={newContact.mobile} onChange={(e) => setNewContact({ ...newContact, mobile: e.target.value })} />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" color="secondary" onClick={() => setNewContact({ name: "", email: "", mobile: "" })}>Reset</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Contacts;
