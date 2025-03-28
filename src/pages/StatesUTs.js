import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const StatesUTs = ({ states = [], setStates = () => {} }) => {
  const navigate = useNavigate();
  

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        States & UTs
      </Typography>

      {/* Button to Add New State or UT */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#002855", color: "white", fontSize: "1rem", px: 3, py: 1 }}
          onClick={() => navigate("/add-state-ut")}
        >
          + Add New State or UT
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>State/ UT ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name Of The State/UT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {states.length > 0 ? (
              states.map((state, index) => (
                <TableRow key={index}>
                  <TableCell>{state.id}</TableCell>
                  <TableCell>{state.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
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

export default StatesUTs;