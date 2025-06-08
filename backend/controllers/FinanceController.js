const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const {
  getInvestments,
  addInvestment,
  updateInvestment,
} = require('../data/investments');


router.get('/finance/categories', (req, res) => {
    const jsonPath = path.join(__dirname, '../data/kategorien.json');
    const fileData = fs.readFileSync(jsonPath, 'utf-8');
    const categories = JSON.parse(fileData);
    res.json(categories);
});


router.get('/finance', (req, res) => {
  const projectId = req.query.projectId ? Number(req.query.projectId) : undefined;
  const investments = getInvestments(projectId);
  res.json(investments);
});


router.post('/finance', (req, res) => {
  try {
    const newInvestment = addInvestment(req.body);
    res.status(201).json(newInvestment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/finance', (req, res) => {
  try {
    const updatedInvestment = updateInvestment(req.body);
    res.json(updatedInvestment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
