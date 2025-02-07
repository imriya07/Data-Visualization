const mongoose = require('mongoose'); 

const analyticsSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  age: { type: String,enum: ['15-25', '>25'], },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  startDate: { type: String, required: true },  // Change type to String
  endDate: { type: String, required: true }     // Change type to String
});

module.exports = mongoose.model('Analytics', analyticsSchema);
