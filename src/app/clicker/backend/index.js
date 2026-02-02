const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const scoreRoutes = require('./routes/scores');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/scores', scoreRoutes);

const uri = "mongodb+srv://joelnp:joel16@cluster0.qcsid.mongodb.net/clicker";
mongoose.connect(uri)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
