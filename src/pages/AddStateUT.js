import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddStateUT = ({ setStates }) => {
  const navigate = useNavigate();
  const [stateId, setStateId] = useState("");
  const [stateName, setStateName] = useState("");

  const handleSubmit = () => {
    if (stateId && stateName) {
      setStates((prevStates) => [...prevStates, { id: stateId, name: stateName }]);
      navigate("/states-uts"); // Go back to the States & UTs page
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Add New State or UT
      </Typography>
      <TextField
        label="State/ UT ID"
        fullWidth
        value={stateId}
        onChange={(e) => setStateId(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Name Of The State/UT"
        fullWidth
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
        margin="normal"
      />
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={() => navigate("/states-uts")}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddStateUT;