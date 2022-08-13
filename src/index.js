const express = require('express');
var cors = require('cors')
const app = express();

require('dotenv').config();
const port =process.env.PORT || 3001;
const db = require('./config/db')
db.connect();
const route = require('./routers');

app.use(express.json());

app.use(cors())

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});