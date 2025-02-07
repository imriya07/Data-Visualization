const Analytics = require('../models/Analytics');

// Add analytics data
exports.addAnalytics = async (req, res) => {
  try {
    const { feature, timeSpent, age, gender, startDate, endDate } = req.body;

    const newAnalytics = new Analytics({
      feature,
      timeSpent,
      age,
      gender,
      startDate,
      endDate,
    });

    await newAnalytics.save();

    const response = {
      feature: newAnalytics.feature,
      timeSpent: newAnalytics.timeSpent,
      age: newAnalytics.age,
      gender: newAnalytics.gender,
      startDate: newAnalytics.startDate,
      endDate: newAnalytics.endDate,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all analytics data
exports.getAllDataAnalytics = async (req, res) => {
  try {
    const analyticsData = await Analytics.find();
    res.status(200).json(analyticsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get analytics data with filters
exports.getAnalytics = async (req, res) => {
  const { age, gender, startDate, endDate } = req.query;
  const filters = {};

  // Filter by age range
  if (age) {
    if (age === '15-25') {
      filters.age = { $gte: 15, $lte: 25 }; // Age between 15 and 25
    } else if (age === '>25') {
      filters.age = { $gt: 25 }; // Age greater than 25
    }
  }

  // Filter by gender
  if (gender) filters.gender = new RegExp(`^${gender}$`, 'i');

  // Filter by date range
  if (startDate && endDate) {
    filters.startDate = { $lte: endDate }; // DB startDate before or on endDate
    filters.endDate = { $gte: startDate }; // DB endDate after or on startDate
  }

  console.log('Filters applied:', filters);

  try {
    const data = await Analytics.find(filters);
    res.json(data);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get analytics data by feature
exports.getAnalyticsByFeature = async (req, res) => {
  const { feature, age, gender, startDate, endDate } = req.query;
  const filters = { feature };

  // Include global filters
  if (age) {
    filters.age = age === "15-25" ? { $gte: 15, $lte: 25 } : { $gt: 25 };
  }
  if (gender) {
    filters.gender = new RegExp(`^${gender}$`, "i");
  }
  if (startDate && endDate) {
    filters.startDate = { $lte: endDate };
    filters.endDate = { $gte: startDate };
  }

  try {
    const data = await Analytics.find(filters);
    res.json(data);
  } catch (err) {
    console.error("Error fetching feature data", err);
    res.status(500).json({ error: err.message });
  }
};

