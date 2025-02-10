import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie"; // Import js-cookie
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import BarChartComponent from "./BarChartComponent";
import Logout from "./Logout";
import { useSearchParams } from "react-router-dom";
import "./Dashboard.css";

const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { icon: <LogoutIcon />, action: <Logout /> },
];

export default function DashboardLayoutSidebarCollapsed() {
  const [pathname, setPathname] = useState("/dashboard");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState("");

  // Load filters from cookies or URL params
  const [filters, setFilters] = useState({
    age: Cookies.get("age") || searchParams.get("age") || "",
    gender: Cookies.get("gender") || searchParams.get("gender") || "",
    startDate: Cookies.get("startDate") || searchParams.get("startDate") || "",
    endDate: Cookies.get("endDate") || searchParams.get("endDate") || "",
  });

  useEffect(() => {
    setSearchParams(filters);
    // Save filters to cookies
    Cookies.set("age", filters.age, { expires: 7 });
    Cookies.set("gender", filters.gender, { expires: 7 });
    Cookies.set("startDate", filters.startDate, { expires: 7 });
    Cookies.set("endDate", filters.endDate, { expires: 7 });
  }, [filters, setSearchParams]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const handleApplyFilter = () => {
    const origin = window?.location?.origin || "";
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    const queryString = new URLSearchParams(nonEmptyFilters).toString();
    const link = `${origin}/login${queryString ? `?${queryString}` : ""}`;

    setSharedLink(link);
    setModalOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({ age: "", gender: "", startDate: "", endDate: "" });
    Cookies.remove("age");
    Cookies.remove("gender");
    Cookies.remove("startDate");
    Cookies.remove("endDate");
    toast.info("Filters reset to default.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharedLink).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  return (
    <AppProvider navigation={NAVIGATION} router={{ pathname, navigate: setPathname }} window={window} branding={{ title: "Dashboard" }}>
      <DashboardLayout defaultSidebarCollapsed>
        <ToastContainer />
        <Box sx={{ py: 4, textAlign: "center" }}>
          <div className="container">
            <div className="row g-3">
              <div className="col-md-1"></div>
              <div className="col-md-2">
                <select className="form-select" id="age" value={filters.age} onChange={handleFilterChange}>
                  <option value="">Select Age</option>
                  <option value="15-25">15-25</option>
                  <option value=">25">{'>25'}</option>
                </select>
              </div>
              <div className="col-md-2">
                <select className="form-select" id="gender" value={filters.gender} onChange={handleFilterChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-2">
                <input type="date" className="form-control" id="startDate" value={filters.startDate} onChange={handleFilterChange} />
              </div>
              <div className="col-md-2">
                <input type="date" className="form-control" id="endDate" value={filters.endDate} onChange={handleFilterChange} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={handleApplyFilter}>Shared View</button>
              </div>
              <div className="col-md-1">
                <button className="btn btn-primary" onClick={handleResetFilters}>Reset</button>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <BarChartComponent filters={filters} />
          </div>

          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2, textAlign: "center" }}>
              <h2>Share This View</h2>
              <input type="text" className="form-control" value={sharedLink} readOnly style={{ marginBottom: "20px", padding: "10px", width: "100%" }} />
              <Button variant="contained" color="primary" onClick={copyToClipboard}>Copy Link</Button>
              <Button variant="text" color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
            </Box>
          </Modal>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
