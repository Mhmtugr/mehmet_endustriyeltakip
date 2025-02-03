import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OrdersList from "./components/OrdersList";
import CreateOrder from "./components/CreateOrder";
import ProductionList from "./components/ProductionList";
import CreateProduction from "./components/CreateProduction";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#1976d2", color: "#fff" }}>
        <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>Giriş</Link>
        <Link to="/dashboard" style={{ color: "#fff", marginRight: "1rem" }}>Dashboard</Link>
        <Link to="/orders" style={{ color: "#fff", marginRight: "1rem" }}>Siparişler</Link>
        <Link to="/production" style={{ color: "#fff", marginRight: "1rem" }}>Üretim</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/new-order" element={<CreateOrder />} />
        <Route path="/production" element={<ProductionList />} />
        <Route path="/new-production" element={<CreateProduction />} />
      </Routes>
    </Router>
  );
}

export default App;
