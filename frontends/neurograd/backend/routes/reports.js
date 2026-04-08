const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Report = require('../models/Report');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const FLASK_API = 'http://localhost:6000';

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() !== '.edf')
      return cb(new Error('Only .edf files are allowed!'), false);
    cb(null, true);
  },
  limits: { fileSize: 100 * 1024 * 1024 }
});

router.post('/upload', authMiddleware, upload.single('edfFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

    const report = await Report.create({
      user: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      status: 'processing'
    });

    res.status(201).json({ message: 'File uploaded! Running EEG analysis...', report });

    // Call Flask in background
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
        contentType: 'application/octet-stream'
      });

      const flaskRes = await axios.post(`${FLASK_API}/predict`, form, {
        headers: form.getHeaders(),
        timeout: 120000
      });

      const result = flaskRes.data;
      await Report.findByIdAndUpdate(report._id, {
        status: 'completed',
        result: result.summary,
        seizureDetected: result.seizure_detected,
        seizureWindows: result.seizure_windows,
        totalWindows: result.total_windows,
        seizurePercentage: result.seizure_percentage
      });
      console.log('✅ EEG analysis done:', result.label);

    } catch (flaskErr) {
      console.error('Flask error:', flaskErr.message);
      await Report.findByIdAndUpdate(report._id, {
        status: 'failed',
        result: 'EEG model failed. Make sure Flask is running on port 6000.'
      });
    }

  } catch (err) {
    res.status(500).json({ message: 'Upload error: ' + err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
    if (!report) return res.status(404).json({ message: 'Report not found.' });
    res.json({ report });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
    if (!report) return res.status(404).json({ message: 'Report not found.' });
    if (fs.existsSync(report.filePath)) fs.unlinkSync(report.filePath);
    await report.deleteOne();
    res.json({ message: 'Report deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;