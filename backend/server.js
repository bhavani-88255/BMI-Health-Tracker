const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bmitracker';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// BMI Record Schema
const bmiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  bmi: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const BMIRecord = mongoose.model('BMIRecord', bmiSchema);

// ==================== ROUTES ====================

// GET all records
app.get('/api/bmi', async (req, res) => {
  try {
    const records = await BMIRecord.find().sort({ date: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST new BMI record
app.post('/api/bmi', async (req, res) => {
  try {
    const { name, age, height, weight } = req.body;

    if (!name || !age || !height || !weight) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const bmiValue = parseFloat((weight / ((height / 100) ** 2)).toFixed(2));

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal weight';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    const record = new BMIRecord({ name, age, height, weight, bmi: bmiValue, category });
    const savedRecord = await record.save();

    res.status(201).json({ success: true, data: savedRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single record by ID
app.get('/api/bmi/:id', async (req, res) => {
  try {
    const record = await BMIRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update record
app.put('/api/bmi/:id', async (req, res) => {
  try {
    const { name, age, height, weight } = req.body;
    const bmiValue = parseFloat((weight / ((height / 100) ** 2)).toFixed(2));

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal weight';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    const updated = await BMIRecord.findByIdAndUpdate(
      req.params.id,
      { name, age, height, weight, bmi: bmiValue, category },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Record not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE record
app.delete('/api/bmi/:id', async (req, res) => {
  try {
    const deleted = await BMIRecord.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Record not found' });
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET stats
app.get('/api/stats', async (req, res) => {
  try {
    const total = await BMIRecord.countDocuments();
    const categories = await BMIRecord.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const avgBMI = await BMIRecord.aggregate([
      { $group: { _id: null, avg: { $avg: '$bmi' } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        categories,
        avgBMI: avgBMI[0]?.avg?.toFixed(2) || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
