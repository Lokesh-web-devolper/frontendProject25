import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Plus
} from "lucide-react";
import "./FinancePage.css";

export default function FinancePage({ onNavigate, onLogout }) {
    const navigate = useNavigate();
  const financialMetrics = [
    { title: "Total Revenue", value: "$2,847,350", change: "+12.5%", icon: DollarSign, color: "#2e7d32" },
    { title: "Outstanding Fees", value: "$284,750", change: "-8.2%", icon: AlertCircle, color: "#ef6c00" },
    { title: "Scholarships Awarded", value: "$456,200", change: "+15.3%", icon: CreditCard, color: "#1976d2" },
    { title: "Collection Rate", value: "94.2%", change: "+2.1%", icon: TrendingUp, color: "#6a1b9a" },
  ];

  const expenses = [
    { name: "Faculty Salaries", value: 45, color: "#4285f4" },
    { name: "Infrastructure", value: 25, color: "#34a853" },
    { name: "Technology", value: 15, color: "#fbbc05" },
    { name: "Administration", value: 10, color: "#ea4335" },
    { name: "Others", value: 5, color: "#ab47bc" }
  ];
  const logout = () => navigate('/');
  return (
    <div className="finance-container">
      <div className="finance-header">
        <button className="back-btn" onClick={() => navigate('/Dashboard')}>
          <ArrowLeft size={18} /> Finance Management
        </button>
        <div className="header-actions">
          <button className="btn add-btn"><Plus size={16}/> Add Transaction</button>
          <button className="btn Finance_logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="metrics-grid">
        {financialMetrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: m.color + "20", color: m.color }}>
              <m.icon size={22} />
            </div>
            <div>
              <h3>{m.title}</h3>
              <p className="metric-value">{m.value}</p>
              <p className="metric-change">{m.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
