import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddBankGuarantee = ({ setBank }) => {
  const navigate = useNavigate();
  const [bankId, setBankId] = useState("");
  const [documentID, setDocumentId] = useState("");
  const [bankName, setBankName] = useState("");
  const [contractNo, setContractNo] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [bgNo, setBgNo] = useState("");
  const [validityDateBg, setValidityDateBg] = useState("");
  const [validityDate, setValidityDate] = useState("");

  const handleSubmit = () => {
    if (bankId && documentID && bankName && contractNo && ifscCode && amountValue && bgNo && validityDateBg && validityDate) {
      
      const dataToSend = {
        contractId: contractNo,  // Contract ID
        documentId: documentID,  // Document ID
        role: "Contract Checker", // Default role
        receivedFrom: "CurrentUser", // Replace with logged-in user dynamically
        receivedDateTime: new Date().toLocaleString(), // Current timestamp
      };
  
      setBank((prevBank) => [...prevBank, dataToSend]);
  
      // Navigate to To-Do List with the contract & document data
      navigate("/todolist", { state: dataToSend });
  
    } else {
      alert("Please fill in all required fields.");
    }
  };
  

  const handleReset = () => {
    setBankId("");
    setDocumentId("");
    setBankName("");
    setContractNo("");
    setIFSCCode("");
    setAmountValue("");
    setBgNo("");
    setValidityDateBg("");
    setValidityDate("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Add Bank Guarantee
      </Typography>

      <TextField label="Bank Id" fullWidth value={bankId} onChange={(e) => setBankId(e.target.value)} margin="normal" />
      <TextField label="Document Id" fullWidth value={documentID} onChange={(e) => setDocumentId(e.target.value)} margin="normal" />
      <TextField label="Name Of The Bank" fullWidth value={bankName} onChange={(e) => setBankName(e.target.value)} margin="normal" />
      <TextField label="Contract ID" fullWidth value={contractNo} onChange={(e) => setContractNo(e.target.value)} margin="normal" />
      <TextField label="IFSC Code" fullWidth value={ifscCode} onChange={(e) => setIFSCCode(e.target.value)} margin="normal" />
      <TextField label="Amount" type="number" fullWidth value={amountValue} onChange={(e) => setAmountValue(e.target.value)} margin="normal" />
      <TextField label="BG No" fullWidth value={bgNo} onChange={(e) => setBgNo(e.target.value)} margin="normal" />
      
      <TextField
        label="BG Date"
        type="date"
        fullWidth
        value={validityDateBg}
        onChange={(e) => setValidityDateBg(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Validity Date"
        type="date"
        fullWidth
        value={validityDate}
        onChange={(e) => setValidityDate(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="contained" 
         sx={{ bgcolor: "darkorange", "&:hover": { bgcolor: "darkorange" } }} 
          onClick={handleReset}>
          Reset
        </Button>
        <Button 
         variant="contained" 
         sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }} 
          onClick={handleSubmit}
        >  

          Forward
        </Button>
      </Box>
    </Box>
  );
};

export default AddBankGuarantee;