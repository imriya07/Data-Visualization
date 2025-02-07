import React, { useState } from "react";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import BarChartComponent from "./BarChartComponent";
import Logout from "./Logout";
import "./Dashboard.css";

const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { icon: <LogoutIcon />, action: <Logout /> },
];

export default function DashboardLayoutSidebarCollapsed(props) {
  const [pathname, setPathname] = useState("/dashboard");
  const [filters, setFilters] = useState({
    age: "",
    gender: "",
    startDate: "",
    endDate: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState("");

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const handleApplyFilter = () => {
    // Use the global window with a fallback
    const origin =
      (typeof window !== "undefined" &&
        window.location &&
        window.location.origin) ||
      "";

    // Filter out keys with empty values
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
    console.log("Filters reset to default. Displaying real data.");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharedLink).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  // Use global window if available
  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      window={demoWindow}
      branding={{ title: "Dashboard" }}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <Box sx={{ py: 4, alignItems: "center", textAlign: "center" }}>
          <div className="container">
            <div className="row g-3">
              <div className="col-md-1"></div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  id="age"
                  value={filters.age}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Age</option>
                  <option value="15-25">15-25</option>
                  <option value=">25">>25</option>               
                   </select>
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  id="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn"
                  style={{ backgroundColor: "#0c7399", color: "white" }}
                  onClick={handleApplyFilter}
                >
                  Shared View
                </button>
              </div>
              <div className="col-md-1">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#0c7399",
                    color: "white",
                    width: "110px",
                  }}
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <BarChartComponent filters={filters} />
          </div>

          {/* Modal for Shared View */}
          <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <h2 id="modal-modal-title">Share This View</h2>
              <input
                type="text"
                className="form-control"
                value={sharedLink}
                readOnly
                style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={copyToClipboard}
              >
                Copy Link
              </Button>
              <Button
                variant="text"
                color="secondary"
                onClick={() => setModalOpen(false)}
                style={{ marginLeft: "10px" }}
              >
                Close
              </Button>
              <div style={{ marginTop: "15px" }}>
                <a href={sharedLink} target="_blank" rel="noopener noreferrer">
                  Open Shared View
                </a>
              </div>
            </Box>
          </Modal>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
