import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  LibraryBooks as PagesIcon,
  MeetingRoom as MeetingRoomIcon,
  Description as DescriptionIcon,
  ExpandLess,
  ExpandMore,
  ExitToApp as LogoutIcon, // Logout Icon
} from "@mui/icons-material";

const Sidebar = () => {
  const { logout } = useContext(AuthContext); // Access logout function

  const [openBGs, setOpenBGs] = useState(false);
  const [openOnboardings, setOpenOnboardings] = useState(false);  
  const [openStandarddata, setOpenStandarddata] = useState(false);
  const [OpenInteractions, setOpenInteractions] = useState(false);
  const [openMobilization, setOpenMobilization] = useState(false);
  const [openSite, setOpenSite] = useState(false);
  const [openQualityManagement, setOpenQualityManagement] = useState(false);
  const [openOSHAS , setOpenOSHAS] = useState(false);
  const [openInvoicing, setOpenInvoicing] = useState(false);
  const [openClaims, setOpenClaims] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Contract Nipuna 360 AI</h2>
      <List style={styles.list}>
        {/* Dashboard */}
        <ListItem button component={Link} to="/" style={styles.listItem}>
          <ListItemIcon>
            <DashboardIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Dashboard</Typography>} />
        </ListItem>

        {/* To Do List */}
        <ListItem button component={Link} to="/todolist" style={styles.listItem}>
          <ListItemIcon>
            <DashboardIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>To Do List</Typography>} />
        </ListItem>


        {/* Standard Data */}
        <ListItem button onClick={() => setOpenStandarddata(!openStandarddata)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Standard Data</Typography>} />
          {openStandarddata ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        
        {/* Submenu: Standard Data */}
        <Collapse in={openStandarddata} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Countries" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Countries</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/States & UTs" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>States & UTs</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Sectors" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Sectors</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Pariyojana" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Pariyojana</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Contract Topics" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Contract Topics</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Contract Models" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Contract Models</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/BOQ Item Groups" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>BOQ Item Groups</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Material Groups" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Material Groups</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Equipment Groups" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Equipment Groups</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Enabling Material Groups" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Enabling Material Groups</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Materials" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Materials</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Equipments" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Equipments</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Enabling Materials" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Enabling Materials</Typography>} />
            </ListItem>
          </List>
        </Collapse>

        {/* Onboarding */}
        <ListItem button onClick={() => setOpenOnboardings(!openOnboardings)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Onboarding</Typography>} />
          {openOnboardings ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Onboarding */}
        <Collapse in={openOnboardings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/legal-entities" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Legal Entities</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/contracts" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Contracts</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/users" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Users</Typography>} />
            </ListItem>
          </List>
        </Collapse>

        {/* BGs Insurances */}
        <ListItem button onClick={() => setOpenBGs(!openBGs)} style={styles.listItem}>
          <ListItemIcon>
            <AssignmentIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>BGs Insurances</Typography>} />
          {openBGs ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: BGs Insurances */}
        <Collapse in={openBGs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button component={Link} to="/bank-guarantees" style={styles.subListItem}>
            <ListItemText primary={<Typography style={styles.subText}>Bank Guarantees</Typography>} />
          </ListItem>

            <ListItem button component={Link} to="/Insurances" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Insurances</Typography>} />
            </ListItem>
          </List>
        </Collapse>

        {/* Interactions */}
        <ListItem button onClick={() => setOpenInteractions(!OpenInteractions)} style={styles.listItem}>
          <ListItemIcon>
            <MeetingRoomIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Interactions</Typography>} />
          {OpenInteractions ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Interactions */}
        <Collapse in={OpenInteractions} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Meetings" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Meetings</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Instructions" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Instructions</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Documents" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Documents</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Training" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Training</Typography>} />
            </ListItem>
          </List>
        </Collapse>

        {/* Mobilization & Demobilization */}
        <ListItem button onClick={() => setOpenMobilization(!openMobilization)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Mobilization & Demobilization</Typography>} />
          {openMobilization ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Onboarding */}
        <Collapse in={openMobilization} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Team Members" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Team Members</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Plant" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Plant</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Labour" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Labour</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Construction Materials" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Construction Materials</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Subcontracting" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Subcontracting</Typography>} />
            </ListItem>
          </List>
        </Collapse>

                {/* Site */}
                <ListItem button onClick={() => setOpenSite(!openSite)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Site</Typography>} />
          {openSite ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Site */}
        <Collapse in={openSite} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Possession of Site & Access" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Possession of Site & Access</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Items of Reference" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Items of Reference</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Unforseen Physical Conditions" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Unforseen Physical Conditions</Typography>} />
            </ListItem>
          </List>
        </Collapse>

          {/* QualityManagement */}
        <ListItem button onClick={() => setOpenQualityManagement(!openQualityManagement)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Quality Management</Typography>} />
          {openQualityManagement ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: QualityManagement */}
        <Collapse in={openQualityManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Source" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Source</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Laboratory" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Laboratory</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Laboratory Apparatus" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Laboratory Apparatus</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Testing" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Testing</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Inspection" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Inspection</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Defects" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Defects</Typography>} />
            </ListItem>
          </List>
        </Collapse>

         {/* OSHAS & Sustainability */}
         <ListItem button onClick={() => setOpenOSHAS(!openOSHAS)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>OSHAS & Sustainability</Typography>} />
          {openOSHAS ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: OSHAS & Sustainability */}
        <Collapse in={openOSHAS} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Safety Incidents" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Safety Incidents</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Sustainability" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Sustainability</Typography>} />
            </ListItem>
          </List>
        </Collapse>

         {/* Invoicing and Payments */}
         <ListItem button onClick={() => setOpenInvoicing(!openInvoicing)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Invoicing & Payments</Typography>} />
          {openInvoicing ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Invoicing and Payments */}
        <Collapse in={openInvoicing} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/BOQ" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>BOQ</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Variations" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Variations</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Measurement" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Measurement</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Invoicing" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Invoicing</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Payments" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Payments</Typography>} />
            </ListItem>
          </List>
        </Collapse>

        {/* Claims and Disputes */}
        <ListItem button onClick={() => setOpenClaims(!openClaims)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Claims & Disputes</Typography>} />
          {openClaims ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Claims and Disputes */}
        <Collapse in={openClaims} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Claims" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Claims</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/DAAB" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>DAAB</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Amicable Settlement" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Amicable Settlement</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Arbitration" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Arbitration</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Litigation" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Litigation</Typography>} />
            </ListItem>
          </List>
        </Collapse>

        {/* Other Aspects */}
        <ListItem button onClick={() => setOpenOther(!openOther)} style={styles.listItem}>
          <ListItemIcon>
            <PeopleIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Other Aspects</Typography>} />
          {openOther ? <ExpandLess style={styles.icon} /> : <ExpandMore style={styles.icon} />}
        </ListItem>

        {/* Submenu: Other Aspects */}
        <Collapse in={openOther} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/Termination" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Termination</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Confidentiality" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Confidentiality</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/IPR" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>IPR</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/Assignment" style={styles.subListItem}>
              <ListItemText primary={<Typography style={styles.subText}>Assignment</Typography>} />
            </ListItem>
         </List>
        </Collapse>

        {/* Other Page */}
        <ListItem button component={Link} to="/other" style={{ ...styles.listItem, marginBottom: "50px" }}>
          <ListItemIcon>
            <PagesIcon style={styles.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography style={styles.text}>Other Page</Typography>} />
        </ListItem>
      </List>

      {/* Logout Button - Positioned Up */}
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        style={styles.logoutButton}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#002855",
    color: "white",
    padding: "1px",
    position: "fixed",
    borderRadius: "12px",
    left: "0",
    top: "0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",  
    justifyContent: "space-between",
  },
  list: {
    flexGrow: 1, // Allows list to grow but leave space for the logout button
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    fontStyle: "italic",
    marginBottom: "20px",
    color: "white",
  },
  text: {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    color: "white",
    fontSize: "32px",
  },
  listItem: {
    marginBottom: "10px",
  },
  subListItem: {
    paddingLeft: "40px",
  },
  subText: {
    fontSize: "16px",
    color: "white",
  },
  logoutButton: {
    marginTop: "5px", // Moves it slightly up
    marginBottom: "9000px", // Adds space below it
    backgroundColor: "#d32f2f",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
  },
};

export default Sidebar;
