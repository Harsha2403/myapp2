import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, MenuItem, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Typography, Divider, Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const states = ["Andhra Pradesh", "Tamil Nadu", "Karnataka", "Maharashtra"];

  const fetchSavedAddresses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/address/address_contacts");
      const data = await response.json();
      if (response.ok) {
        setSavedAddresses(data);
      } else {
        setError(data.message || "Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("Server error while fetching addresses.");
    }
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const handleSubmit = async () => {
    setError("");

    if (!address || !city || !state || !pincode.match(/^\d{6}$/) || !phoneNo.match(/^\d{10}$/)) {
      setError("Please fill in all required fields with valid data.");
      return;
    }

    const addressData = { address, address_line2: addressLine2, city, state, pincode, phone: phoneNo };

    try {
      const response = await fetch("http://localhost:5000/api/address/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      });

      const result = await response.json();

      if (response.ok) {
        fetchSavedAddresses();
        handleReset();
        setShowForm(false);
      } else {
        setError(result.message || "Error adding address");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setAddress("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPincode("");
    setPhoneNo("");
    setError("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Address</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add"}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto", borderRadius: 2 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: "#e0e0e0" }}>
              <TableRow>
                <TableCell><b>Address</b></TableCell>
                <TableCell><b>Address2</b></TableCell>
                <TableCell><b>City</b></TableCell>
                <TableCell><b>State</b></TableCell>
                <TableCell><b>Pincode</b></TableCell>
                <TableCell><b>Phone No</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedAddresses.map((address, index) => (
                <TableRow key={index} hover>
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.address_line2}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.state}</TableCell>
                  <TableCell>{address.pincode}</TableCell>
                  <TableCell>{address.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Add Address</Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            <TextField label="Registered Office Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
            <TextField label="Registered Office Address Line 2" fullWidth value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
            <TextField label="City / Town" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
            <TextField label="State / UT" fullWidth select value={state} onChange={(e) => setState(e.target.value)}>
              {states.map((state, index) => (
                <MenuItem key={index} value={state}>{state}</MenuItem>
              ))}
            </TextField>
            <TextField label="Pincode" fullWidth value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <TextField label="Phone Number" fullWidth value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Address;
