import React from "react";
import { Box, Grid, Card, Typography, Select, MenuItem } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import InfoCard from "../components/InfoCard"; // Import the new component


const costOverRunData = [
  { title: "Contract Price", values: [{ value: "48,942", label: "Original" }, { value: "54,368", label: "Revised" }] },
  { title: "Value of Disputes", values: [{ value: "856", label: "Employers" }, { value: "3,245", label: "Contractors" }] },
  { title: "Variations in Consideration", values: [{ value: "+ 2,943", label: "324 No’s" }, { value: "- 245", label: "18 No’s" }] },
];

const timeOverRunData = [...costOverRunData]; // Reuse the same data (modify if needed)

const statistics = [
  { title: "Organizations", value: 92 },
  { title: "States/UTs", value: 12 },
  { title: "Sectors", value: 24 },
  { title: "Contract Models", value: 18 },
  { title: "Contract Topics", value: 24 },
  { title: "Item Groups", value: 36 },
  { title: "Users", value: 785 },
];

const stageOfContractData = [
  { name: "0 to 25%", value: 240, color: "#3358FF" },
  { name: "26% to 50%", value: 407, color: "#FF5733" },
  { name: "50% to 75%", value: 198, color: "#A6A6A6" },
  { name: "76% to 90%", value: 108, color: "#FFC300" },
  { name: "90% to 100%", value: 246, color: "#3498DB" },
];

const contractDisputesData = [
  { name: "Exchanging Notifications", value: 950, color: "#3358FF" },
  { name: "In Arbitration", value: 45, color: "#FF5733" },
  { name: "In Litigation", value: 120, color: "#A6A6A6" },
  { name: "No Disputes", value: 85, color: "#FFC300" },
];

const DropdownFilter = ({ label }) => (
  <Select defaultValue="Option 1" displayEmpty fullWidth sx={{ mb: 1 }}>
    <MenuItem value="Option 1">{label} - Option 1</MenuItem>
    <MenuItem value="Option 2">{label} - Option 2</MenuItem>
    <MenuItem value="Option 3">{label} - Option 3</MenuItem>
  </Select>
);

const EmployeeApprover = () => {
  return (
    
        
    <Box sx={{ padding:6 }}>
      
     

      {/* Statistics Cards */}
      <Grid container spacing={20}justifyContent="center" sx={{ display: "flex" }}>
        {statistics.map((stat, index) => (
          <Grid item key={index}>
            <Card sx={{ backgroundColor: "#002147", color: "white", padding: 4, width: 140, textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{stat.value}</Typography>
              <Typography sx={{ fontSize: 14 }}>{stat.title}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>Stage of Contract</Typography>
            <PieChart width={350} height={350}>
              <Pie data={stageOfContractData} dataKey="value" cx="50%" cy="50%" outerRadius={120}>
                {stageOfContractData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>Contract with Disputes</Typography>
            <PieChart width={350} height={350}>
              <Pie data={contractDisputesData} dataKey="value" cx="50%" cy="50%" outerRadius={120}>
                {contractDisputesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Grid>
      </Grid>

      {/* Cost Over Run and Time Over Run Sections */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
       {/* Cost Over Run Section */}
<Grid item xs={12} md={6}>
  <Card sx={{ padding: 25 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>Cost Over Run</Typography>
    
    {/* Dropdown Filters */}
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Organization" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="States & UTs" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Sectors" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Status" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Contract" /></Grid>
    </Grid>

    {/* Statistic Cards */}
    <Grid container spacing={2}>
      {costOverRunData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <InfoCard title={item.title} values={item.values} />
        </Grid>
      ))}
    </Grid>
  </Card>
</Grid>
{/* Time over Section */}
<Grid item xs={12} md={6}>
  <Card sx={{ padding: 25 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>Time Over Run</Typography>
    
    {/* Dropdown Filters */}
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Organization" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="States & UTs" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Sectors" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Status" /></Grid>
      <Grid item xs={12} sm={6} md={3}><DropdownFilter label="Contract" /></Grid>
    </Grid>

    {/* Statistic Cards */}
    <Grid container spacing={2}>
      {costOverRunData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <InfoCard title={item.title} values={item.values} />
        </Grid>
      ))}
    </Grid>
  </Card>
</Grid>

      </Grid>

    </Box>
    
  );
};

export default EmployeeApprover;
