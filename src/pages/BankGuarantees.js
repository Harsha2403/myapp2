import React from "react";
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

const BankGuarantees = ({ bank = [], setBank = () => {} }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Bank Guarantees
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
          onClick={() => navigate("/add-bank-guarantee")}
        >
          + Add New Bank Guarantee
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={5}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Bank ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Document ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Bank Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contract ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>IFSC Code</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>BG No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>BG Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Validity Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bank.length > 0 ? (
              bank.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Id}</TableCell>
                  <TableCell>{item.DocID}</TableCell>
                  <TableCell>{item.Name}</TableCell>
                  <TableCell>{item.No}</TableCell>
                  <TableCell>{item.Code}</TableCell>
                  <TableCell>{item.Value}</TableCell>
                  <TableCell>{item.Noo}</TableCell>
                  <TableCell>{item.ValidityDateBg}</TableCell>
                  <TableCell>{item.ValidityDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BankGuarantees;
