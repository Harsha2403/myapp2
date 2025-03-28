import React from "react";
import { Card, Typography } from "@mui/material";

const InfoCard = ({ title, values }) => {
  return (
    <Card sx={{ backgroundColor: "#002147", color: "white", padding: 2, width: "100%", textAlign: "center" }}>
      <Typography sx={{ fontSize: 12, textAlign: "right" }}>₹Cr</Typography>
      {values.map((item, index) => (
        <Typography key={index} sx={{ fontSize: 18, fontWeight: "bold" }}>
          {item.value} <span style={{ fontSize: 14 }}>({item.label})</span>
        </Typography>
      ))}
      <Typography sx={{ fontSize: 12, marginTop: 1 }}>{title}</Typography>
    </Card>
  );
};

export default InfoCard;