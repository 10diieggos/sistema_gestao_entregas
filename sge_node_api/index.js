const express = require('express');
const config = require('./config');
const { sequelize } = require('./database');
const servicosRoutes = require('./routes/servicos');


const app = express();
const port = config.port;

app.use(express.json());
app.use('/servicos', servicosRoutes);


app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
