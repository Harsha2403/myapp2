import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AddLegalEntity = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define tab paths
  const tabPaths = [
    "/add-legal-entity/general",
    "/add-legal-entity/listing",
    "/add-legal-entity/address",
    "/add-legal-entity/contacts",
    "/add-legal-entity/registrations",
    "/add-legal-entity/bank",
    "/add-legal-entity/shareholdings",
    "/add-legal-entity/directors",


  ];

  // Determine active tab using startsWith
  const activeTab = tabPaths.findIndex((path) => location.pathname.startsWith(path));
  const currentTab = activeTab !== 0 ? activeTab : 0;

  const handleTabChange = (_, newValue) => {
    navigate(tabPaths[newValue]);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Legal Entity
      </Typography>

      {/* Tabs Navigation */}
      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="General" />
        <Tab label="Listing" />
        <Tab label="Address" />
        <Tab label="Contacts"/>       
        <Tab label="GST " /> 
        <Tab label="Bank" />
        <Tab label="Shareholding" />
        <Tab label="Directors" />
      </Tabs>

      {/* Outlet to render child components */}
      <Outlet />
    </Box>
  );
};

export default AddLegalEntity;
