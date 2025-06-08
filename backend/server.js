require('dotenv').config();

const express = require('express');
const cors = require('cors');
const projectRoutes  = require('./controllers/ProjectController');
const categoryRoutes = require('./controllers/FinanceController');
const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3000;
const requestMapping = process.env.REQUEST_MAPPING || '/api';

app.use(cors());
app.use(requestMapping, projectRoutes);
app.use(requestMapping, categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
