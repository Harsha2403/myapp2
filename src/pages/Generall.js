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

const Generall = () => {
  const navigate = useNavigate();
  const [contractid, setContractId] = useState("");
  const [name, setContractName] = useState("");
  const [sector, setSector] = useState("");
  const [state, setState] = useState("");
  const [contracttype, setContractType] = useState("");
  const [employer, setEmployer] = useState("");
  const [contract, setContract] = useState("");
  const [engineer, setEngineer] = useState("");
  const [contractAmount, setContractAmount] = useState("");
  const [contractmodel, setContractModel] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [savedContracts, setSavedContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const contractTypes =[
    "hi",
    "hello"
  ];


  useEffect(() => {
    fetchSavedContracts();
  }, []);

  const fetchSavedContracts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/contract/contract");
      const data = await response.json();
      if (response.ok) {
        setSavedContracts(data);
      } else {
        console.error("Failed to fetch contracts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!contractid || !name || !sector || !state || !contracttype || !employer || !contract || !engineer || !contractAmount || !contractmodel || !startdate || !enddate) {
      alert("Please fill in all required fields.");
      return;
    }

    const contractData = {
      contractid,
      name,
      sector,
      state,
      contracttype,
      employer,
      contract,
      engineer,
      contractAmount,
      contractmodel,
      startdate,
      enddate,
    };

    try {
      const response = await fetch("http://localhost:5000/api/contract/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contractData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Contract added successfully");
        fetchSavedContracts();
        handleReset();
      } else {
        alert(result.message || "Error adding contract");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setContractId("");
    setContractName("");
    setSector("");
    setState("");
    setContractType("");
    setEmployer("");
    setContract("");
    setEngineer("");
    setContractAmount("");
    setContractModel("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Contracts
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add"}
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto", borderRadius: 2 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: "#e0e0e0" }}>
              <TableRow>
                {["Contract ID", "Name", "Sector", "State", "Contract Type", "Employer", "Contract", "Engineer", "Contract Model", "Start Date", "End Date"].map((header, index) => (
                  <TableCell key={index}><b>{header}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {savedContracts.map((contract, index) => (
                <TableRow key={index} hover>
                  <TableCell>{contract.contractid}</TableCell>
                  <TableCell>{contract.name}</TableCell>
                  <TableCell>{contract.sector}</TableCell>
                  <TableCell>{contract.state}</TableCell>
                  <TableCell>{contract.contracttype}</TableCell>
                  <TableCell>{contract.employer}</TableCell>
                  <TableCell>{contract.contract}</TableCell>
                  <TableCell>{contract.engineer}</TableCell>
                  <TableCell>{contract.contractmodel}</TableCell>
                  <TableCell>{contract.startdate}</TableCell>
                  <TableCell>{contract.enddate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Contract Form (Initially Hidden) */}
      {showForm && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Add Contracts
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            <TextField label="Contract Id" fullWidth value={contractid} onChange={(e) => setContractId(e.target.value)} />
            <TextField label="Name Of The Contract" fullWidth value={name} onChange={(e) => setContractName(e.target.value)} />
            <TextField label="Sector" fullWidth select value={sector} onChange={(e) => setSector(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {contractTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="States/ UT" fullWidth select value={state} onChange={(e) => setState(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {contractTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="Type Of Contract" fullWidth select value={contracttype} onChange={(e) => setContractType(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {contractTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="Employer" fullWidth select value={employer} onChange={(e) => setEmployer(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {contractTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="Contract" fullWidth select value={contract} onChange={(e) => setContract(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {contractTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="Engineer" fullWidth select value={engineer} onChange={(e) => setEngineer(e.target.value)}>
              <MenuItem value="" disabled>Select Type</MenuItem>
              {contractTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField label="Contract Amount" fullWidth value={contractAmount} onChange={(e) => setContractAmount(e.target.value)} />
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={startdate}
                  onChange={(e) => setStartDate(e.target.value)}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={enddate}
                  onChange={(e) => setEndDate(e.target.value)}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
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

export default Generall;
