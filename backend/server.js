require('dotenv').config();

const express = require('express');
const cors = require('cors');
const projectRoutes = require('./controllers/ProjectController');
const app = express();

const port = Number(process.env.PORT) || 3000;
const requestMapping = process.env.REQUEST_MAPPING || '/api';

app.use(cors());
app.use(requestMapping, projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
