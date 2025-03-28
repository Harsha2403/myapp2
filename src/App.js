import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import ToDoList from "./pages/ToDoList";
import ContractMaker from "./pages/ContractMaker";
import ContractChecker from "./pages/ContractChecker";
import ContractApprover from "./pages/ContractApprover";
import EmployeeMaker from "./pages/EmployeeMaker";
import EmployeeChecker from "./pages/EmployeeChecker";
import EmployeeApprover from "./pages/EmployeeApprover";

import LegalEntities from "./pages/LegalEntities";
import AddLegalEntity from "./pages/AddLegalEntity";
import General from "./pages/General";
import Listing from "./pages/Listing";
import Address from "./pages/Address";
import Contacts from "./pages/Contacts";
import Registrations from "./pages/Registrations";
import BankDetails from "./pages/BankDetails";
import Shareholdings from "./pages/Shareholdings";
import Directors from "./pages/Directors";


import Contracts from "./pages/Contracts";
import AddContract from "./pages/AddContract";
import Generall from "./pages/Generall";
import BOQ from "./pages/BOQ";
import Users from "./pages/Users";


import BankGuarantees from "./pages/BankGuarantees";
import AddBankGuarantee from "./pages/AddBankGuarantee";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  const { user } = useContext(AuthContext);
  const [bank, setBank] = useState([]);
  const [legal, setLegal] = useState([]);
  const [contract, setContract] = useState([]);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {user && <Sidebar />}

        <div style={{ flex: 1, padding: "20px", marginLeft: user ? "250px" : "0px" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/todolist" element={<ProtectedRoute element={<ToDoList />} />} />
            <Route path="/contract-maker" element={<ProtectedRoute element={<ContractMaker />} />} />
            <Route path="/contract-checker" element={<ProtectedRoute element={<ContractChecker />} />} />
            <Route path="/contract-approver" element={<ProtectedRoute element={<ContractApprover />} />} />
            <Route path="/employee-maker" element={<ProtectedRoute element={<EmployeeMaker />} />} />
            <Route path="/employee-checker" element={<ProtectedRoute element={<EmployeeChecker />} />} />
            <Route path="/employee-approver" element={<ProtectedRoute element={<EmployeeApprover />} />} />
            <Route path="/users" element={<ProtectedRoute element={<Users /> }/> } />

            {/* Legal Entity Routes - Nested Routing */}
            <Route path="/legal-entities" element={<ProtectedRoute element={<LegalEntities legal={legal} setLegal={setLegal} />} />} />
            <Route path="/add-legal-entity" element={<ProtectedRoute element={<AddLegalEntity setLegal={setLegal} />} />}>
              <Route path="general" element={<General />} />
              <Route path="listing" element={<Listing />} />
              <Route path="address" element={<Address />} />
              <Route path="contacts" element={<Contacts/>} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="bank" element={<BankDetails />} />
              <Route path="shareholdings" element={<Shareholdings />} />
              <Route path="directors" element={<Directors />} />
            </Route>

            {/* Contract Routes */}
            <Route path="/contracts" element={<ProtectedRoute element={<Contracts contract={contract} setContract={setContract} />} />} />
            <Route path="/add-contract" element={<ProtectedRoute element={<AddContract setContract={setContract} />} />}>
              <Route path="generall" element={<Generall />} />
              <Route path="boq" element={<BOQ />} />
              </Route>

  

  
            {/* Bank Guarantee Routes */}
            <Route path="/bank-guarantees" element={<ProtectedRoute element={<BankGuarantees bank={bank} setBank={setBank} />} />} />
            <Route path="/add-bank-guarantee" element={<ProtectedRoute element={<AddBankGuarantee setBank={setBank} />} />} />

            {/* Default Route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
