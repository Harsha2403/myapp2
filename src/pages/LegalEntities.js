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

const LegalEntities = () => {
  const navigate = useNavigate();
  const [legal, setLegal] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/legal-entity")
      .then((res) => res.json())
      .then((data) => setLegal(data))
      .catch((err) => console.error("Error fetching legal entities:", err));
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Legal Entities
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
          onClick={() => navigate("/add-legal-entity")}
        >
          + Add Legal Entity
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={5} sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Legal Entity ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name of the Legal Entity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {legal.length > 0 ? (
              legal.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => setSelectedEntity(item)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                >
                  <TableCell>{item.legal_entity_id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
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

      {selectedEntity && (
        <Box mt={4} p={3} component={Paper} elevation={5}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Legal Entity Details
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Legal Entity ID:</TableCell>
                <TableCell>{selectedEntity.legal_entity_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name:</TableCell>
                <TableCell>{selectedEntity.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Type:</TableCell>
                <TableCell>{selectedEntity.type || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>CIN:</TableCell>
                <TableCell>{selectedEntity.cin || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Website:</TableCell>
                <TableCell>{selectedEntity.website || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>PAN:</TableCell>
                <TableCell>{selectedEntity.pan || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>TAN:</TableCell>
                <TableCell>{selectedEntity.tan || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Udyam Number:</TableCell>
                <TableCell>{selectedEntity.udyam_number || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>IE:</TableCell>
                <TableCell>{selectedEntity.ie || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Close Details Button */}
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setSelectedEntity(null)}
            >
              Close Details
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LegalEntities;
