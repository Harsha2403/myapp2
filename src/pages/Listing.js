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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Listing = () => {
  const navigate = useNavigate();
  const [legalCompany, setLegalCompany] = useState("");
  const [legalStock, setLegalStock] = useState("");
  const [savedListings, setSavedListings] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    if (!legalCompany || !legalStock) {
      alert("Please fill in all required fields.");
      return;
    }

    const listingData = {
      legalcompany: legalCompany,
      legalstock: legalStock,
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
    setLegalCompany("");
    setLegalStock("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Saved Listings Section */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Stock Listings
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
                <TableCell><b>ISIN NO</b></TableCell>
                <TableCell><b>Name Of The Stock Exchange</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedListings.map((listing, index) => (
                <TableRow key={index} hover>
                  <TableCell>{listing.legalcompany}</TableCell>
                  <TableCell>{listing.legalstock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Listing Form (Initially Hidden) */}
      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Add Stock Listing
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            <TextField
              label="ISIN NO"
              fullWidth
              value={legalCompany}
              onChange={(e) => setLegalCompany(e.target.value)}
            />

            <TextField
              label="Name Of The Stock Exchange"
              fullWidth
              value={legalStock}
              onChange={(e) => setLegalStock(e.target.value)}
            />
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

export default Listing;
