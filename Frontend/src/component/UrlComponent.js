import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UrlComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState("");
  const [filters, setFilters] = useState({
    age: "",
    gender: "",
    startDate: "",
    endDate: "",
  });

  // Extract filters from URL on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newFilters = {
      age: queryParams.get("age") || "",
      gender: queryParams.get("gender") || "",
      startDate: queryParams.get("startDate") || "",
      endDate: queryParams.get("endDate") || "",
    };

    // Update the state only if there are filters in the URL
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  // Open Modal and Generate Link with Active Filters
  const handleOpenModal = () => {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    const queryString = new URLSearchParams(nonEmptyFilters).toString();
    const link =  `${window.location.origin}/shared-view${queryString ? `?${queryString}` : ""}`;

    setSharedLink(link);
    setModalOpen(true);
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
    <div>
      <ToastContainer />
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Open Share Popup
      </Button>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
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
          <h2>Share This Link</h2>
          <input
            type="text"
            value={sharedLink}
            readOnly
            className="form-control"
            style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
          />
          <Button variant="contained" color="primary" onClick={copyToClipboard}>
            Copy Link
          </Button>
          <Button variant="text" color="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UrlComponent;
