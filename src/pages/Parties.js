import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Parties = () => {
  const navigate = useNavigate();
  const [employeer, setEmployeer] = useState("");
  const [contractor, setContractor] = useState("");
  const [engineer, setEngineer] = useState("");
  const [banker, setBanker] = useState("");
  const [insurance, setInsurance] =useState("");

  const [savedListings, setSavedListings] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const listingEmployeer=[
    "hi",
    "hello",
  ];

  const listingContractor=[
    "hi",
    "hello",
  ];

  const listingEngineer=[
    "hi",
    "hello",
  ];

  const listingBanker=[
    "hi",
    "hello",
  ];

  const listingInsurance=[
    "hi",
    "hello",
  ];


  useEffect(() => {
    fetchSavedListings();
  }, []);

  const fetchSavedListings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/listed");
      const data = await response.json();
      if (response.ok) {
        setSavedListings(data);
      } else {
        console.error("Failed to fetch listings:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!employeer || !contractor || !engineer || !banker || !insurance) {
      alert("Please fill in all required fields.");
      return;
    }

    const listingData = {
      employeer: employeer,
      contractor: contractor,
      engineer: engineer,
      banker: banker,
      insurance: insurance,
    };

    try {
      const response = await fetch("http://localhost:5000/api/listed/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Listing added successfully");
        fetchSavedListings();
        handleReset();
      } else {
        alert(result.message || "Error adding listing");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setEmployeer("");
    setContractor("");
    setEngineer("");
    setBanker("");
    setInsurance("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Saved Listings Section */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Parties
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close" : "Add"}
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto", borderRadius: 2 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: "#e0e0e0" }}>
              <TableRow>
                <TableCell><b>Employer</b></TableCell>
                <TableCell><b>Contractor</b></TableCell>
                <TableCell><b>Engineer</b></TableCell>
                <TableCell><b>Banker</b></TableCell>
                <TableCell><b>Insurance Agency</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedListings.map((listing, index) => (
                <TableRow key={index} hover>
                  <TableCell>{listing.employeer}</TableCell>
                  <TableCell>{listing.contractor}</TableCell>
                  <TableCell>{listing.engineer}</TableCell>
                  <TableCell>{listing.banker}</TableCell>
                  <TableCell>{listing.insurance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Parties Form (Initially Hidden) */}
      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Add Parties
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          <TextField label="Employeer" fullWidth select value={employeer} onChange={(e) => setEmployeer(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {listingEmployeer.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField label="Contractor" fullWidth select value={contractor} onChange={(e) => setContractor(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {listingContractor.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField label="Enineer" fullWidth select value={engineer} onChange={(e) => setEngineer(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {listingEngineer.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField label="Banker" fullWidth select value={banker} onChange={(e) => setBanker(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {listingBanker.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField label="Insurance Agency" fullWidth select value={insurance} onChange={(e) => setInsurance(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {listingInsurance.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
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

export default Parties;
