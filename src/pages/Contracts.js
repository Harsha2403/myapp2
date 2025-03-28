import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const Contracts = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/contract/contract");
      const data = await response.json();
      if (response.ok) {
        setContracts(data);
      } else {
        console.error("Failed to fetch contracts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Contracts
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#002855",
            color: "white",
            fontSize: "1rem",
            px: 3,
            py: 1,
          }}
          onClick={() => navigate("/add-contract")}
        >
          + Add Contract
        </Button>
      </Box>

      {/* Scrollable Table */}
      <TableContainer component={Paper} elevation={5} sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Contract ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sector</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contract Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Employer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contractor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Engineer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>State Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contract Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.length > 0 ? (
              contracts.map((contract, index) => (
                <TableRow
                  key={index}
                  onClick={() => setSelectedContract(contract)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                >
                  <TableCell>{contract.contractid}</TableCell>
                  <TableCell>{contract.name}</TableCell>
                  <TableCell>{contract.contracttype}</TableCell>
                  <TableCell>{contract.employer}</TableCell>
                  <TableCell>{contract.contract}</TableCell>
                  <TableCell>{contract.Engineer}</TableCell>
                  <TableCell>{contract.startdate}</TableCell>
                  <TableCell>{contract.enddate}</TableCell>
                  <TableCell>{contract.contractAmount}</TableCell>
                
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Section */}
      {selectedContract && (
        <Box mt={4} p={3} component={Paper} elevation={5}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Contract Details
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Contract ID:</TableCell>
                <TableCell>{selectedContract.contractid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name:</TableCell>
                <TableCell>{selectedContract.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Sector:</TableCell>
                <TableCell>{selectedContract.sector}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>State/ UTs:</TableCell>
                <TableCell>{selectedContract.state}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Contractor Type:</TableCell>
                <TableCell>{selectedContract.contracttype || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Start Date:</TableCell>
                <TableCell>{selectedContract.startdate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>End date:</TableCell>
                <TableCell>{selectedContract.enddate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
            {/* Close Details Button */}
                    <Box mt={3} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setSelectedContract(null)}
                      >
                        Close Details
                      </Button>
                    </Box>
           
        </Box>
      )}
    </Box>
  );
};

export default Contracts;
