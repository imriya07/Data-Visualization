import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UrlComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState('');

  const handleOpenModal = () => {
    // Generate a sharable link (replace this with your dynamic logic if necessary)
    const link = `${window.location.origin}/shared-view?param=example`;
    setSharedLink(link);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharedLink).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        style={{ marginTop: '20px' }}
      >
        Open Share Popup
      </Button>

      {/* Modal Component */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <h2 id="modal-title">Share This Link</h2>
          <input
            type="text"
            value={sharedLink}
            readOnly
            className="form-control"
            style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
          />
          <Button variant="contained" color="primary" onClick={copyToClipboard}>
            Copy Link
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={handleCloseModal}
            style={{ marginLeft: '10px' }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UrlComponent;
