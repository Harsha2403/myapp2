import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
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

const General = () => {
  const navigate = useNavigate();
  const [legalId, setLegalId] = useState("");
  const [legalName, setLegalName] = useState("");
  const [legalType, setLegalType] = useState("");
  const [legalNo, setLegalNo] = useState("");
  const [legalWeb, setLegalWeb] = useState("");
  const [pan, setPan] = useState("");
  const [tan, setTan] = useState("");
  const [udyam_number, setUdyamNumber] = useState("");
  const [ie, setIe] = useState("");
  const [savedEntities, setSavedEntities] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  const entityTypes = [
    "Single Person Company",
    "LLP Company",
    "Private Limited Company",
    "Public Limited Company",
    "Unincorporated Joint Venture",
    "Consortium",
    "Proprietorship",
    "Partnership",
    "Hindu Undivided Family",
    "Registered Society",
    "Registered Trust",
    "Other",
  ];

  useEffect(() => {
    fetchSavedEntities();
  }, []);

  const fetchSavedEntities = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/legal-entity");
      const data = await response.json();
      if (response.ok) {
        setSavedEntities(data);
      } else {
        console.error("Failed to fetch entities:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!legalId || !legalName || !legalType || !legalNo || !legalWeb || !pan || !tan || !udyam_number || !ie) {
      alert("Please fill in all required fields.");
      return;
    }

    const entityData = {
      legalEntityId: legalId,
      name: legalName,
      type: legalType,
      cin: legalNo,
      website: legalWeb,
      pan,
      tan,
      udyam_number,
      ie,
    };

    try {
      const response = await fetch("http://localhost:5000/api/legal-entity/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entityData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Legal entity added successfully");
        fetchSavedEntities();
        handleReset();
      } else {
        alert(result.message || "Error adding legal entity");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setLegalId("");
    setLegalName("");
    setLegalType("");
    setLegalNo("");
    setLegalWeb("");
    setPan("");
    setTan("");
    setUdyamNumber("");
    setIe("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Saved Entities Section */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Legal Entities
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
                <TableCell><b>Entity ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>CIN</b></TableCell>
                <TableCell><b>Website</b></TableCell>
                <TableCell><b>PAN</b></TableCell>
                <TableCell><b>TAN</b></TableCell>
                <TableCell><b>UDYAM</b></TableCell>
                <TableCell><b>IE Code</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedEntities.map((entity, index) => (
                <TableRow key={index} hover>
                  <TableCell>{entity.legal_entity_id}</TableCell>
                  <TableCell>{entity.name}</TableCell>
                  <TableCell>{entity.type}</TableCell>
                  <TableCell>{entity.cin}</TableCell>
                  <TableCell>{entity.website}</TableCell>
                  <TableCell>{entity.pan}</TableCell>
                  <TableCell>{entity.tan}</TableCell>
                  <TableCell>{entity.udyam_number}</TableCell>
                  <TableCell>{entity.ie}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Legal Entity Form (Initially Hidden) */}
      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Add Legal Entity
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            <TextField label="Legal Entity ID" fullWidth value={legalId} onChange={(e) => setLegalId(e.target.value)} />
            <TextField label="Name Of The Legal Entity" fullWidth value={legalName} onChange={(e) => setLegalName(e.target.value)} />
            <TextField label="Type Of Legal Entity" fullWidth select value={legalType} onChange={(e) => setLegalType(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {entityTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="CIN (Or) Registration Number" fullWidth value={legalNo} onChange={(e) => setLegalNo(e.target.value)} />
            <TextField label="Website" fullWidth value={legalWeb} onChange={(e) => setLegalWeb(e.target.value)} />
            <TextField label="PAN" fullWidth value={pan} onChange={(e) => setPan(e.target.value)} />
            <TextField label="TAN" fullWidth value={tan} onChange={(e) => setTan(e.target.value)} />
            <TextField label="UDYAM Number" fullWidth value={udyam_number} onChange={(e) => setUdyamNumber(e.target.value)} />
            <TextField label="IE Code" fullWidth value={ie} onChange={(e) => setIe(e.target.value)} />
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

export default General;
