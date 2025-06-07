const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/projects', (req, res) => {
    // Reading the data that was provided
    const jsonPath = path.join(__dirname, '../data/projekte.json');
    const fileData = fs.readFileSync(jsonPath, 'utf-8');
    const projects = JSON.parse(fileData); // Just regular JS objects, no types here

    res.json(projects);
});

module.exports = router;
