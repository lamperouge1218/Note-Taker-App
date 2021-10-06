const express = require('express');
const PORT = 3001;
const app = express();
const notes = require("./db/db.json");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);