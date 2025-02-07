const express = require('express');
const { addAnalytics, getAnalytics, getAllDataAnalytics, getAnalyticsByFeature } = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAnalytics);
router.post('/', authenticateToken, addAnalytics);
router.get("/", getAllDataAnalytics);
router.get("/feature", getAnalyticsByFeature);


module.exports = router;